import asyncHandler from 'express-async-handler';
import consultationService from '../services/consultationService.js';
import Consultation from '../models/Consultation.js';
import { sendAdminNotificationEmail } from '../utils/sendEmail.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import logger from '../config/logger.js';

export const submitConsultation = asyncHandler(async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
  });

  if (req.body.phone && !req.body.mobile) {
    req.body.mobile = req.body.phone;
  }
  
  req.body.paymentStatus = 'pending';
  const consultation = await consultationService.createConsultation(req.body);
  
  if (!req.body.amount) {
    res.status(400);
    throw new Error('Amount is required for consultation');
  }

  const options = {
    amount: req.body.amount * 100, // paise
    currency: "INR",
    receipt: `rcpt_${consultation._id}`
  };

  try {
    const order = await razorpay.orders.create(options);
    return res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      consultationId: consultation._id,
      name: consultation.name,
      email: consultation.email,
      phone: consultation.mobile
    });
  } catch (err) {
    console.error("RAZORPAY ERROR:", err);
    if (process.env.NODE_ENV === 'development') {
      logger.warn('⚠️ Razorpay keys missing/invalid. Falling back to mock order for testing.');
      return res.status(201).json({
        success: true,
        orderId: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        keyId: 'rzp_test_mock',
        consultationId: consultation._id,
        name: consultation.name,
        email: consultation.email,
        phone: consultation.mobile,
        isMock: true,
        debugError: err.message || err.description || JSON.stringify(err)
      });
    }
    logger.error('Razorpay Order Creation Failed: ' + err.message);
    res.status(500);
    throw new Error('Payment gateway error. Please try again.');
  }
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, consultationId } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder');
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  const isMockPayment = process.env.NODE_ENV === 'development' && razorpay_signature === 'mock_signature';

  if (generated_signature === razorpay_signature || isMockPayment) {
    const consultation = await Consultation.findById(consultationId);
    if (!consultation) {
      res.status(404);
      throw new Error('Consultation not found');
    }

    consultation.paymentStatus = 'completed';
    consultation.transactionId = razorpay_payment_id;
    await consultation.save();

    // Send email notification to Admin only after successful payment
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #C8832A; border-radius: 10px;">
        <h2 style="color: #2A0F02;">New Paid Consultation Booking</h2>
        <p>A new consultation has been booked and paid for on the platform. Here are the details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${consultation.name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${consultation.email || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Mobile:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${consultation.mobile || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Consultation Type:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${consultation.consultationType || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Amount Paid:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">₹${consultation.amount || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Transaction ID:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${consultation.transactionId || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${consultation.message || 'N/A'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Please login to the Admin Dashboard to manage this booking.</p>
      </div>
    `;
    
    await sendAdminNotificationEmail('Alert: New Paid Consultation Booked', emailHtml);

    res.json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400);
    throw new Error('Invalid payment signature');
  }
});


export const getConsultations = asyncHandler(async (req, res) => {
  const list = await consultationService.getAllConsultations();
  res.json({ success: true, data: list });
});

export const getStats = asyncHandler(async (req, res) => {
  const stats = await consultationService.getConsultationStats();
  res.json({ success: true, data: stats });
});
