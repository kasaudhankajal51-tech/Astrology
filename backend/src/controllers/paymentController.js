import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Order from '../models/Order.js';
import Enrollment from '../models/Enrollment.js';
import Lead from '../models/leadModel.js';
import Coupon from '../models/Coupon.js';
import { sendCredentialsEmail, sendAdminNotificationEmail } from '../utils/sendEmail.js';
import { createRazorpayInstance, getRazorpayConfig } from '../utils/razorpayConfig.js';
import dotenv from 'dotenv';
dotenv.config();

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Public (Guest Checkout) or Private
export const createOrder = async (req, res) => {
  try {
    const { courseId, name, email, mobile, couponCode } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const originalAmount = Number(course.price) || 0;
    let payableAmount = originalAmount;
    let discountAmount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const normalizedCoupon = String(couponCode).trim().toUpperCase();
      const coupon = await Coupon.findOne({ code: normalizedCoupon });

      if (!coupon || !coupon.active) {
        return res.status(400).json({ success: false, message: 'Coupon code is invalid or expired' });
      }

      if (coupon.usageLimit > 0 && coupon.usageCount >= coupon.usageLimit) {
        return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
      }

      if (coupon.courseId && coupon.courseId !== String(courseId)) {
        return res.status(400).json({ success: false, message: 'Coupon is not valid for this course' });
      }

      if (coupon.minPurchase > 0 && originalAmount < coupon.minPurchase) {
        return res.status(400).json({ success: false, message: `Minimum purchase of ${coupon.minPurchase} is required` });
      }

      discountAmount = coupon.discountType === 'fixed'
        ? Number(coupon.discountValue)
        : Math.round((originalAmount * Number(coupon.discountValue)) / 100);

      discountAmount = Math.max(0, Math.min(discountAmount, originalAmount));
      payableAmount = Math.max(originalAmount - discountAmount, 1);
      appliedCoupon = coupon;
    }

    // Razorpay accepts amount in paise.
    const amountInPaise = Math.round(payableAmount * 100);

    if (!req.user && (!email || email.trim() === '')) {
      return res.status(400).json({ success: false, message: 'Email is required for checkout. Please fill in your details.' });
    }

    let userId = null;
    if (req.user) {
      userId = req.user.id || req.user._id;
    }

    // Determine student details
    let studentEmail = email;
    let studentName = name;
    let studentMobile = mobile;

    if (req.user) {
      const user = await User.findById(req.user.id || req.user._id);
      if (user) {
        studentEmail = email || user.email;
        studentName = name || user.name;
        studentMobile = mobile || user.mobile;
      }
    }

    const order = await Order.create({
      userId: userId, // This can be null for guest checkouts until verify phase
      courseId: courseId,
      amount: payableAmount,
      originalAmount,
      discountAmount,
      couponCode: appliedCoupon?.code,
      paymentStatus: 'pending',
      guestDetails: userId ? undefined : { name: studentName, email: studentEmail, mobile: studentMobile }
    });

    let razorpayOrder;
    try {
      const razorpayInstance = createRazorpayInstance();
      razorpayOrder = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: order._id.toString()
      });
      order.razorpayOrderId = razorpayOrder.id; // Store order ID as the razorpay reference
      await order.save();
    } catch (err) {
      console.error('RAZORPAY ERROR:', err);
      return res.status(500).json({ success: false, message: err.message || 'Failed to create Razorpay Order' });
    }

    if (studentEmail && studentName) {
      await Lead.create({
        name: studentName,
        email: studentEmail,
        phone: studentMobile || 'N/A',
        type: 'Course',
        courseName: course.title,
        message: appliedCoupon ? `Coupon applied: ${appliedCoupon.code}, discount: ${discountAmount}` : '',
        paymentStatus: 'Pending',
        status: 'Pending',
        transactionId: razorpayOrder.id // Storing order ID to find it later
      });
    }

    const { keyId } = getRazorpayConfig();

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      internalOrderId: order._id,
      amount: razorpayOrder.amount, // Return exact amount in paise
      payableAmount,
      originalAmount,
      discountAmount,
      couponCode: appliedCoupon?.code || '',
      currency: 'INR',
      keyId,
      name: studentName || '',
      email: studentEmail || '',
      phone: studentMobile || ''
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
    const { keySecret } = getRazorpayConfig();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');

    const isMockPayment = process.env.NODE_ENV === 'development' && razorpay_signature?.startsWith('sig_mock_');
    const isAuthentic = expectedSignature === razorpay_signature || isMockPayment;

    if (!isAuthentic) {
      // Find order and mark as failed
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: 'failed' }
      );
      await Lead.findOneAndUpdate(
        { transactionId: razorpay_order_id },
        { paymentStatus: 'Failed', status: 'Pending' }
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
    } else {
      // If already logged in, fetch their details from DB to satisfy Lead validation
      if (!studentEmail || !studentName) {
        const user = await User.findById(finalUserId);
        if (user) {
          studentEmail = studentEmail || user.email;
          studentName = studentName || user.name;
        }
      }
    }

    // Create Enrollment
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + (course.validityDays || 365));

    await Enrollment.findOneAndUpdate(
      { userId: finalUserId, courseId: course._id },
      { 
        validUntil, 
        isActive: true,
        $setOnInsert: { progress: { completedVideos: [] } } 
      },
      { upsert: true, new: true }
    );

    // Create Lead for Admin Panel visibility
    const existingLead = await Lead.findOne({ transactionId: razorpay_order_id });
    if (existingLead) {
      existingLead.paymentStatus = 'Completed';
      existingLead.status = 'Done';
      existingLead.transactionId = razorpay_payment_id;
      if (order.couponCode) {
        existingLead.message = `${existingLead.message || ''}${existingLead.message ? '\n' : ''}Coupon used: ${order.couponCode}`;
      }
      await existingLead.save();
    } else {
      await Lead.create({
        name: studentName,
        email: studentEmail,
        phone: order.guestDetails?.mobile || 'N/A', // mobile might be in guestDetails
        type: 'Course',
        courseName: course.title,
        message: order.couponCode ? `Coupon used: ${order.couponCode}` : '',
        paymentStatus: 'Completed',
        status: 'Done',
        transactionId: razorpay_payment_id
      });
    }

    if (order.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: order.couponCode },
        { $inc: { usageCount: 1 } }
      );
    }

    // Send email with credentials ONLY if we generated a new password
    if (generatedPassword) {
      await sendCredentialsEmail(studentEmail, generatedPassword, studentName, course.title);
    }

    // Send admin notification
    await sendAdminNotificationEmail(
      `New Course Purchased: ${course.title}`,
      `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
        <h2 style="color: #6b4a44; margin-top: 0;">New Course Sale! 🎉</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Course:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${course.title}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Student:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${studentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${studentEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Amount:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">₹${order.amount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Transaction ID:</strong></td>
            <td style="padding: 8px 0;">${razorpay_payment_id}</td>
          </tr>
        </table>
      </div>
      `
    );

    res.status(200).json({
      success: true,
      message: 'Payment verified and enrollment active',
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    import('fs').then(fs => fs.writeFileSync('error.log', error.stack || error.message));
    res.status(500).json({ success: false, message: 'Server error during verification', error: error.message, stack: error.stack });
  }
};

