import Razorpay from 'razorpay';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Order from '../models/Order.js';
import Enrollment from '../models/Enrollment.js';
import { sendCredentialsEmail } from '../utils/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Razorpay
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public (Guest Checkout) or Private
export const createOrder = async (req, res) => {
  try {
    const { courseId, name, email, mobile } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Razorpay accepts amount in paise (multiply by 100)
    const amountInPaise = Math.round(course.price * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_course_${courseId}_${Date.now()}`
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // If user doesn't exist, we will create the order but link it to the email temporarily
    // We'll create the user after successful payment to avoid junk accounts
    let userId = null;
    if (req.user) {
      userId = req.user._id;
    }

    const order = await Order.create({
      userId: userId, // This can be null for guest checkouts until verify phase
      courseId: courseId,
      razorpayOrderId: razorpayOrder.id,
      amount: course.price,
      paymentStatus: 'pending',
      guestDetails: userId ? undefined : { name, email, mobile }
    });

    res.status(200).json({
      success: true,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: course.price,
      currency: 'INR'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Server error while creating order' });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Public
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, name } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      // Find order and mark as failed
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: 'failed' }
      );
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Payment Successful
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found in our database' });
    }

    if (order.paymentStatus === 'completed') {
      return res.status(200).json({ success: true, message: 'Order already processed' });
    }

    order.paymentStatus = 'completed';
    await order.save();

    const course = await Course.findById(order.courseId);

    let finalUserId = order.userId;
    let generatedPassword = null;
    let studentEmail = email || (order.guestDetails ? order.guestDetails.email : '');
    let studentName = name || (order.guestDetails ? order.guestDetails.name : '');

    // Guest Checkout Logic
    if (!finalUserId) {
      // Check if user already exists
      let user = await User.findOne({ email: studentEmail });
      
      if (!user) {
        // Generate random password
        generatedPassword = crypto.randomBytes(4).toString('hex'); // 8 char password
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
        
        user = await User.create({
          name: studentName,
          email: studentEmail,
          passwordHash: hashedPassword,
          role: 'student'
        });
      }
      finalUserId = user._id;
      order.userId = finalUserId;
      await order.save();
    }

    // Create Enrollment
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + course.validityDays);

    await Enrollment.findOneAndUpdate(
      { userId: finalUserId, courseId: course._id },
      { 
        validUntil, 
        isActive: true,
        $setOnInsert: { progress: { completedVideos: [] } } 
      },
      { upsert: true, new: true }
    );

    // Send email with credentials ONLY if we generated a new password
    if (generatedPassword) {
      await sendCredentialsEmail(studentEmail, generatedPassword, studentName, course.title);
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified and enrollment active',
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Server error during verification' });
  }
};

// @desc    Webhook for capturing payments
// @route   POST /api/payment/webhook
// @access  Public
export const webhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET; // Best practice is separate webhook secret
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid signature');
    }

    const event = req.body.event;

    if (event === 'payment.captured') {
      const paymentEntity = req.body.payload.payment.entity;
      const razorpay_order_id = paymentEntity.order_id;

      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (order && order.paymentStatus === 'pending') {
        // Fallback processing
        order.paymentStatus = 'completed';
        await order.save();
        
        const course = await Course.findById(order.courseId);
        
        // At this point, we lack guest emails since we didn't get them from verify.
        // That's why we saved guestDetails in the order during createOrder!
        let finalUserId = order.userId;
        let generatedPassword = null;
        let studentEmail = order.guestDetails?.email;
        let studentName = order.guestDetails?.name;

        if (!finalUserId && studentEmail) {
          let user = await User.findOne({ email: studentEmail });
          if (!user) {
            generatedPassword = crypto.randomBytes(4).toString('hex');
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            user = await User.create({
              name: studentName,
              email: studentEmail,
              passwordHash: hashedPassword,
              role: 'student'
            });
          }
          finalUserId = user._id;
          order.userId = finalUserId;
          await order.save();
        }

        if (finalUserId) {
          const validUntil = new Date();
          validUntil.setDate(validUntil.getDate() + course.validityDays);

          await Enrollment.findOneAndUpdate(
            { userId: finalUserId, courseId: course._id },
            { 
              validUntil, 
              isActive: true,
              $setOnInsert: { progress: { completedVideos: [] } } 
            },
            { upsert: true, new: true }
          );

          if (generatedPassword) {
            await sendCredentialsEmail(studentEmail, generatedPassword, studentName, course.title);
          }
        }
      }
    }

    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).send('Server Error');
  }
};
