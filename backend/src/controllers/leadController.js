import Lead from '../models/leadModel.js';
import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import exceljs from 'exceljs';
import logger from '../config/logger.js';

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
  const { name, email, phone, type, courseName } = req.body;

  const lead = await Lead.create({
    name, email, phone, type, courseName
  });

  // Mock Payment ID generated for frontend redirect handling
  const transactionId = `txn_${Date.now()}`;
  
  res.status(201).json({
    success: true,
    leadId: lead._id,
    paymentUrl: `/payment?leadId=${lead._id}&amount=999&txn=${transactionId}`, // Frontend router catches this
  });
});

// @desc    Update lead payment status
// @route   POST /api/leads/payment-callback
export const paymentCallback = asyncHandler(async (req, res) => {
  const { leadId, status, transactionId } = req.body; // status: 'Completed' | 'Failed'

  const lead = await Lead.findById(leadId);
  if (!lead) {
    res.status(404);
    throw new Error('Lead not found');
  }

  lead.paymentStatus = status;
  if (transactionId) lead.transactionId = transactionId;
  await lead.save();

  if (status === 'Completed') {
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
