import Lead from '../models/leadModel.js';
import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import exceljs from 'exceljs';
import logger from '../config/logger.js';
import Razorpay from 'razorpay';
import Joi from 'joi';

// Setup Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

// Validation Schema
const leadSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  type: Joi.string().required(),
  courseName: Joi.string().required()
});

// Setup basic transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER || 'test@example.com',
    pass: process.env.EMAIL_PASS || 'password'
  }
});

// @desc    Submit new lead (Pre-payment)
// @route   POST /api/leads
export const createLead = asyncHandler(async (req, res) => {
  const { error } = leadSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { name, email, phone, type, courseName } = req.body;

  // 1. Create Lead in Database
  const lead = await Lead.create({
    name, email, phone, type, courseName,
    paymentStatus: 'Pending'
  });

  // 2. Create Razorpay Order
  const options = {
    amount: 99 * 100, // Amount in paise (₹99)
    currency: "INR",
    receipt: `receipt_${lead._id}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    
    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      leadId: lead._id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      logger.warn('⚠️ Razorpay keys missing/invalid. Falling back to mock order for testing.');
      return res.status(201).json({
        success: true,
        orderId: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
        keyId: 'rzp_test_mock',
        leadId: lead._id,
        name,
        email,
        phone,
        isMock: true
      });
    }
    logger.error('Razorpay Order Creation Failed: ' + err.message);
    res.status(500);
    throw new Error('Payment gateway error. Please try again.');
  }
});

// Helper function for sending confirmation email
const sendConfirmationEmail = async (lead) => {
  try {
    await transporter.sendMail({
      from: `"Astro Ava" <${process.env.EMAIL_USER || 'no-reply@astroava.com'}>`,
      to: lead.email,
      subject: `Booking Confirmed: ${lead.courseName || lead.type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #ff6a00; margin: 0;">Astro Ava</h2>
            <p style="color: #666; margin: 5px 0 0;">Your Cosmic Journey Begins Here</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Hi ${lead.name},</h3>
            <p style="color: #555; line-height: 1.6;">
              We are thrilled to confirm your booking for the <strong>${lead.courseName || lead.type}</strong>. 
              Your cosmic blueprint is waiting to be discovered!
            </p>
            <div style="background-color: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #ff6a00; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold; color: #333;">Booking Details:</p>
              <p style="margin: 5px 0; color: #666;">Type: ${lead.type}</p>
              <p style="margin: 5px 0; color: #666;">Reference ID: ${lead._id}</p>
            </div>
          </div>
          <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">
            If you have any questions, feel free to reply to this email or contact our support team.
          </p>
        </div>
      `
    });
    logger.info(`✅ Professional confirmation email sent to: ${lead.email}`);
  } catch (error) {
    logger.error('Failed to send email: ' + error.message);
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/leads/verify-payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, leadId } = req.body;

  const crypto = await import('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder');
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  const isMockPayment = process.env.NODE_ENV === 'development' && razorpay_signature === 'mock_signature';

  if (generated_signature === razorpay_signature || isMockPayment) {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      res.status(404);
      throw new Error('Lead not found');
    }

    lead.paymentStatus = 'Completed';
    lead.transactionId = razorpay_payment_id;
    await lead.save();

    await sendConfirmationEmail(lead);

    res.json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400);
    throw new Error('Invalid payment signature');
  }
});

// @desc    Update lead payment status (Legacy/Webhook)
// @route   POST /api/leads/payment-callback
export const paymentCallback = asyncHandler(async (req, res) => {
  const { leadId, status, transactionId } = req.body;

  const lead = await Lead.findById(leadId);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  lead.paymentStatus = status;
  if (transactionId) lead.transactionId = transactionId;
  await lead.save();

  if (status === 'Completed') {
    await sendConfirmationEmail(lead);
  }

  res.json({ success: true, status: lead.paymentStatus });
});

// @desc    Get all leads (Admin)
// @route   GET /api/leads
export const getLeads = asyncHandler(async (req, res) => {
  const { startDate, endDate, type } = req.query;
  const filter = {};
  
  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  if (type) {
    filter.type = type;
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, leads });
});

// @desc    Export leads to Excel (Admin)
// @route   GET /api/leads/export
export const exportLeads = asyncHandler(async (req, res) => {
  const { startDate, endDate, type } = req.query;
  const filter = {};
  
  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  if (type) {
    filter.type = type;
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Leads');

  worksheet.columns = [
    { header: 'Date', key: 'date', width: 20 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 20 },
    { header: 'Type', key: 'type', width: 15 },
    { header: 'Course/Webinar', key: 'courseName', width: 25 },
    { header: 'Status', key: 'paymentStatus', width: 15 },
  ];

  leads.forEach((lead) => {
    worksheet.addRow({
      date: lead.createdAt.toLocaleDateString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      type: lead.type,
      courseName: lead.courseName || '-',
      paymentStatus: lead.paymentStatus,
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=' + `leads_export_${Date.now()}.xlsx`);

  await workbook.xlsx.write(res);
  res.end();
});
