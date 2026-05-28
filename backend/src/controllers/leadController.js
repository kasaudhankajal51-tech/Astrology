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
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  type: Joi.string().required(),
  courseName: Joi.string().allow('', null),
  consultationType: Joi.string().allow('', null),
  dob: Joi.string().allow('', null),
  tob: Joi.string().allow('', null),
  pob: Joi.string().allow('', null),
  message: Joi.string().allow('', null)
}).unknown(true);

const sendConfirmationEmail = async (lead) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const isWebinar = lead.type === 'Webinar' || lead.type === 'Course';
  const subjectText = isWebinar ? 'Booking Confirmed: Mega Astrology Webinar' : 'Consultation Request Received';
  const headerText = isWebinar ? 'Registration Confirmed!' : 'Request Received!';
  const bodyText = isWebinar 
    ? `<p>Your seat for the <strong>Mega Astrology Webinar</strong> has been successfully reserved. We are excited to guide you through your cosmic journey!</p>`
    : `<p>Your consultation request is received. Thank you for reaching out to us, our team will get back to you shortly to confirm your slot.</p>`;
  const detailsHtml = isWebinar 
    ? `
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Webinar Details:</strong></p>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li><strong>Event:</strong> 2-Day Mega Astrology Webinar</li>
          <li><strong>Time:</strong> 7:00 PM - 9:00 PM IST</li>
          <li><strong>Transaction ID:</strong> ${lead.transactionId || 'N/A'}</li>
        </ul>
      </div>
      <p>A calendar invitation and the Zoom joining link will be sent to you 24 hours before the event starts.</p>
    `
    : `
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Your Request Details:</strong></p>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li><strong>Type:</strong> ${lead.type}</li>
          <li><strong>Consultation:</strong> ${lead.consultationType || 'N/A'}</li>
        </ul>
      </div>
    `;

  const mailOptions = {
    from: `"DS Astro Institute Support" <${process.env.EMAIL_USER}>`,
    to: lead.email,
    subject: subjectText,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background: #6b4a44; color: #ffffff; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">${headerText}</h1>
        </div>
        <div style="padding: 30px; color: #333; line-height: 1.6;">
          <p>Namaste <strong>${lead.name}</strong>,</p>
          ${bodyText}
          ${detailsHtml}
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://dsastroinstitute.com" style="background: #6b4a44; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Community</a>
          </div>
        </div>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777;">
          <p>© ${new Date().getFullYear()} DS Astro Institute. All Rights Reserved.</p>
          <p>If you have any questions, reply to this email.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Confirmation email sent to: ${lead.email}`);
    
    // Admin Notification
    if (process.env.ADMIN_EMAIL) {
      const adminMailOptions = {
        from: `"DS Astro System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead/Booking Alert: ${lead.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
            <h2 style="color: #6b4a44; margin-top: 0;">New Booking/Lead Received! 🎉</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${lead.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${lead.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${lead.type} ${lead.consultationType ? '- ' + lead.consultationType : (lead.courseName ? '- ' + lead.courseName : '')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Preferred date:</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${lead.preferredDate || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Payment Status:</strong></td>
                <td style="padding: 8px 0;">${lead.paymentStatus || 'Pending'}</td>
              </tr>
            </table>
          </div>
        `
      };
      await transporter.sendMail(adminMailOptions);
      logger.info(`Admin notification email sent to: ${process.env.ADMIN_EMAIL}`);
    }
  } catch (err) {
    logger.error('Email sending failed: ' + err.message);
  }
};

// @desc    Submit new lead (Pre-payment)
// @route   POST /api/leads
export const createLead = asyncHandler(async (req, res) => {
  const { error } = leadSchema.validate(req.body);
  if (error) {
    console.log('Lead Validation Error:', error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { name, email, phone, type, courseName, consultationType, dob, tob, pob, message } = req.body;

  // 1. Create Lead in Database
  const lead = await Lead.create({
    name, email, phone, type, courseName, consultationType, dob, tob, pob, message,
    paymentStatus: (type === 'Webinar' || type === 'Course') ? 'Pending' : 'Completed'
  });

  // 2. Only Create Razorpay Order for Paid Types (Course Inquiries are free)
  if (type === 'Webinar' || type === 'Course') {
    const options = {
      amount: 99 * 100, // Amount in paise (₹99)
      currency: "INR",
      receipt: `receipt_${lead._id}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      
      return res.status(201).json({
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
  }

  // 3. For Non-paid Types (Contact, Consultation etc.)
  await sendConfirmationEmail(lead);

  res.status(201).json({
    success: true,
    message: 'Request received successfully. Our team will contact you soon.',
    leadId: lead._id
  });
});


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
    { header: 'Consultation Type', key: 'consultationType', width: 20 },
    { header: 'DOB', key: 'dob', width: 15 },
    { header: 'TOB', key: 'tob', width: 12 },
    { header: 'POB', key: 'pob', width: 20 },
    { header: 'Message', key: 'message', width: 40 },
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
      consultationType: lead.consultationType || '-',
      dob: lead.dob || '-',
      tob: lead.tob || '-',
      pob: lead.pob || '-',
      message: lead.message || '-',
      paymentStatus: lead.paymentStatus,
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
    { status: status }, 
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
