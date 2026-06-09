import Lead from '../models/leadModel.js';
import asyncHandler from 'express-async-handler';
import exceljs from 'exceljs';
import logger from '../config/logger.js';
import Joi from 'joi';
import { createRazorpayInstance, getRazorpayConfig } from '../utils/razorpayConfig.js';
import { sendPaidLeadAdminEmail } from '../utils/sendEmail.js';

const leadSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  type: Joi.string().required(),
  courseName: Joi.string().allow('', null),
  courseType: Joi.string().allow('', null),
  courseId: Joi.string().allow('', null),
  consultationType: Joi.string().allow('', null),
  leadType: Joi.string().allow('', null),
  status: Joi.string().allow('', null),
  paymentStatus: Joi.string().allow('', null),
  dob: Joi.string().allow('', null),
  tob: Joi.string().allow('', null),
  pob: Joi.string().allow('', null),
  message: Joi.string().allow('', null),
  amount: Joi.number().allow(null),
}).unknown(true);

const isPaidLeadType = (type, amount) =>
  type === 'Webinar' || type === 'Course' || type === 'Consultation' || Boolean(amount);

const isLiveCourseEnquiry = (body) =>
  body.type === 'Course-Inquiry' ||
  body.leadType === 'LIVE COURSE LEAD' ||
  body.courseType === 'Live';

const createRazorpayOrderForLead = async (lead, amount) => {
  const options = {
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `receipt_${lead._id}`,
  };

  try {
    const razorpay = createRazorpayInstance();
    const order = await razorpay.orders.create(options);
    const { keyId } = getRazorpayConfig();

    lead.orderId = order.id;
    lead.paymentStatus = 'PENDING';
    if (lead.type === 'Consultation') {
      lead.status = 'Consultation Lead - Not Paid';
    } else if (lead.type === 'Webinar') {
      lead.status = 'Webinar Lead - Not Paid';
    }
    await lead.save();

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    };
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      logger.warn('Razorpay keys missing/invalid. Falling back to mock order for testing.');
      const mockOrderId = `order_mock_${Date.now()}`;
      lead.orderId = mockOrderId;
      lead.paymentStatus = 'PENDING';
      await lead.save();
      return {
        orderId: mockOrderId,
        amount: options.amount,
        currency: options.currency,
        keyId: 'rzp_test_mock',
        isMock: true,
      };
    }
    logger.error('Razorpay Order Creation Failed: ' + err.message);
    throw new Error('Payment gateway error. Please try again.');
  }
};

// @desc    Submit new lead (Pre-payment)
// @route   POST /api/leads
export const createLead = asyncHandler(async (req, res) => {
  const { error } = leadSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const {
    name, email, phone, type, courseName, courseType, courseId,
    consultationType, dob, tob, pob, message, amount,
    leadType, status, paymentStatus,
  } = req.body;

  const requiresPayment = isPaidLeadType(type, amount);
  const liveEnquiry = isLiveCourseEnquiry(req.body);

  const leadData = {
    name,
    email,
    phone,
    type,
    courseName,
    courseType,
    courseId: courseId || undefined,
    consultationType,
    dob,
    tob,
    pob,
    message,
    amount: amount || undefined,
    leadType: leadType || (liveEnquiry ? 'LIVE COURSE LEAD' : undefined),
    status: status || (liveEnquiry ? 'ENQUIRY RECEIVED' : requiresPayment ? 'Pending' : 'Pending'),
    paymentStatus: paymentStatus || (liveEnquiry ? 'NOT REQUIRED' : requiresPayment ? 'PENDING' : 'NOT REQUIRED'),
  };

  const lead = await Lead.create(leadData);

  if (requiresPayment && !liveEnquiry) {
    const payableAmount = amount || (type === 'Webinar' ? 99 : 0);
    if (!payableAmount) {
      res.status(400);
      throw new Error('Amount is required for paid lead types');
    }

    const orderData = await createRazorpayOrderForLead(lead, payableAmount);

    return res.status(201).json({
      success: true,
      leadId: lead._id,
      orderId: orderData.orderId,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId: orderData.keyId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      ...(orderData.isMock ? { isMock: true } : {}),
    });
  }

  res.status(201).json({
    success: true,
    message: 'Request received successfully. Our team will contact you soon.',
    leadId: lead._id,
  });
});

// @desc    Verify Razorpay Payment
// @route   POST /api/leads/verify-payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, leadId } = req.body;
  const { keySecret } = getRazorpayConfig();

  const crypto = await import('crypto');
  const hmac = crypto.createHmac('sha256', keySecret);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  const isMockPayment = process.env.NODE_ENV === 'development' && razorpay_signature === 'mock_signature';

  if (generated_signature !== razorpay_signature && !isMockPayment) {
    res.status(400);
    throw new Error('Invalid payment signature');
  }

  const lead = await Lead.findById(leadId);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  lead.paymentStatus = 'PAID';
  lead.transactionId = razorpay_payment_id;
  lead.orderId = razorpay_order_id;

  if (lead.type === 'Consultation') {
    lead.status = 'Consultation Lead - Paid';
  } else if (lead.type === 'Webinar') {
    lead.status = 'Webinar Lead - Paid';
  } else {
    lead.status = 'Done';
  }

  await lead.save();

  await sendPaidLeadAdminEmail({
    customerName: lead.name,
    phone: lead.phone,
    email: lead.email,
    product: lead.consultationType || lead.courseName || lead.type,
    amount: lead.amount,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
  });

  res.json({ success: true, message: 'Payment verified successfully' });
});

// @desc    Report failed payment
// @route   POST /api/leads/payment-failed
export const paymentFailed = asyncHandler(async (req, res) => {
  const {
    leadId,
    orderId,
    courseId,
    courseName,
    consultationType,
    paymentFor,
    status,
    paymentStatus,
    failureReason,
    razorpayError,
    name,
    email,
    phone,
  } = req.body;

  let lead = null;

  if (leadId) {
    lead = await Lead.findById(leadId);
  } else if (orderId) {
    lead = await Lead.findOne({ $or: [{ orderId }, { transactionId: orderId }] });
  }

  if (lead) {
    lead.paymentStatus = paymentStatus || 'FAILED';
    lead.status = status || lead.status;
    if (failureReason) lead.failureReason = failureReason;
    if (razorpayError) lead.razorpayError = razorpayError;
    if (orderId) lead.orderId = orderId;
    await lead.save();
  } else if (name && email && phone) {
    lead = await Lead.create({
      name,
      email,
      phone,
      type: paymentFor === 'Consultation' ? 'Consultation' : 'Course',
      courseName: courseName || paymentFor,
      courseId: courseId || undefined,
      consultationType,
      paymentFor,
      status: status || 'Recorded Course Lead - Failed Payment',
      paymentStatus: paymentStatus || 'FAILED',
      failureReason,
      razorpayError,
      orderId,
    });
  }

  res.json({
    success: true,
    message: 'Payment failure recorded',
    leadId: lead?._id || null,
  });
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

  lead.paymentStatus = status === 'Completed' ? 'PAID' : status;
  if (transactionId) lead.transactionId = transactionId;
  await lead.save();

  res.json({ success: true, status: lead.paymentStatus });
});

// @desc    Get all leads (Admin)
// @route   GET /api/leads
export const getLeads = asyncHandler(async (req, res) => {
  const { startDate, endDate, type, status, paymentStatus, search } = req.query;
  const filter = {};

  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { name: regex },
      { email: regex },
      { phone: regex },
      { courseName: regex },
      { consultationType: regex },
    ];
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, leads });
});

// @desc    Export leads to Excel (Admin)
// @route   GET /api/leads/export
export const exportLeads = asyncHandler(async (req, res) => {
  const { startDate, endDate, type, status, paymentStatus } = req.query;
  const filter = {};

  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  const leads = await Lead.find(filter).sort({ createdAt: -1 });

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Leads');

  worksheet.columns = [
    { header: 'Date', key: 'date', width: 20 },
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 20 },
    { header: 'Type', key: 'type', width: 15 },
    { header: 'Lead Type', key: 'leadType', width: 25 },
    { header: 'Course/Webinar', key: 'courseName', width: 25 },
    { header: 'Consultation Type', key: 'consultationType', width: 20 },
    { header: 'Status', key: 'status', width: 30 },
    { header: 'Payment Status', key: 'paymentStatus', width: 15 },
    { header: 'Message', key: 'message', width: 40 },
  ];

  leads.forEach((lead) => {
    worksheet.addRow({
      date: lead.createdAt.toLocaleDateString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      type: lead.type,
      leadType: lead.leadType || '-',
      courseName: lead.courseName || '-',
      consultationType: lead.consultationType || '-',
      status: lead.status,
      paymentStatus: lead.paymentStatus,
      message: lead.message || '-',
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=' + `leads_export_${Date.now()}.xlsx`);

  await workbook.xlsx.write(res);
  res.end();
});

// @desc    Update lead status (Admin)
// @route   PUT /api/leads/:id/status
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  res.json({ success: true, message: 'Status updated successfully', lead });
});

// @desc    Delete lead (Admin)
// @route   DELETE /api/leads/:id
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  await lead.deleteOne();
  res.json({ success: true, message: 'Lead removed' });
});
