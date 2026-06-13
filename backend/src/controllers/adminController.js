import Lead from '../models/leadModel.js';
import Blog from '../models/Blog.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Enrollment from '../models/Enrollment.js';
import Consultation from '../models/Consultation.js';
import Newsletter from '../models/Newsletter.js';
import asyncHandler from 'express-async-handler';

const formatConsultationStatus = (status) => {
  if (!status) return 'Pending';
  const normalized = String(status).toLowerCase();
  const map = {
    pending: 'Pending',
    contacted: 'Confirmed',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return map[normalized] || status;
};

const mapOrderPaymentStatus = (status) => {
  if (status === 'completed') return 'PAID';
  if (status === 'failed') return 'FAILED';
  if (status === 'pending') return 'PENDING';
  return String(status || '').toUpperCase();
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalLeads = await Lead.countDocuments();
  const paidConsultations = await Lead.countDocuments({
    $or: [
      { status: 'Consultation Lead - Paid' },
      { type: 'Consultation', paymentStatus: { $in: ['PAID', 'Completed'] } },
    ],
  });
  const recordedCoursePurchases = await Lead.countDocuments({
    $or: [
      { status: 'Recorded Course Lead - Paid' },
      { type: 'Recorded-Course', paymentStatus: { $in: ['PAID', 'Completed'] } },
    ],
  });
  const failedPayments = await Lead.countDocuments({
    $or: [
      { status: 'Recorded Course Lead - Failed Payment' },
      { status: 'Consultation Lead - Not Paid', paymentStatus: 'FAILED' },
      { paymentStatus: { $in: ['FAILED', 'Failed'] } },
    ],
  });
  const liveCourseEnquiries = await Lead.countDocuments({
    $or: [
      { leadType: 'LIVE COURSE LEAD' },
      { type: 'Course', courseType: { $ne: 'Recorded' } },
      { type: 'Course-Inquiry', courseType: 'Live' },
    ],
  });
  const activeArticles = await Blog.countDocuments({ isPublished: true });
  const jobOpenings = await Job.countDocuments({ isActive: true });
  const newsletterSubscribers = await Newsletter.countDocuments({ status: 'Subscribed' });

  res.json({
    success: true,
    stats: {
      recordedCoursePurchases,
      paidConsultations,
      liveCourseEnquiries,
      failedPayments,
      totalLeads,
      activeArticles,
      jobOpenings,
      newsletterSubscribers,
    },
  });
});

// @desc    Get all consultations (student bookings + paid consultation leads)
// @route   GET /api/admin/consultations
export const getConsultations = asyncHandler(async (req, res) => {
  const rows = await Consultation.find()
    .populate('courseId', 'title')
    .populate('userId', 'name email')
    .sort('-createdAt');

  const studentConsultations = rows.map((c) => ({
    _id: c._id,
    source: 'student',
    studentId: c.userId?._id || c.userId || null,
    studentName: c.userId?.name || c.name || '',
    email: c.userId?.email || c.email || '',
    courseId: c.courseId?._id || c.courseId || null,
    courseName: c.courseId?.title || '',
    consultationType: c.consultationType || 'Free Consultation',
    mobile: c.mobile || c.phone || '',
    preferredDatetime: c.preferredDatetime || null,
    notes: c.notes || c.message || '',
    amount: c.amount || null,
    paymentStatus: c.paymentStatus || 'NOT REQUIRED',
    status: formatConsultationStatus(c.status),
    createdAt: c.createdAt,
  }));

  const paidLeadRows = await Lead.find({
    type: 'Consultation',
    $or: [
      { status: 'Consultation Lead - Paid' },
      { paymentStatus: 'PAID' },
      { status: 'Consultation Lead - Not Paid' },
      { status: 'Consultation Lead - Callback Requested' },
    ],
  }).sort('-submittedAt -createdAt');

  const leadConsultations = paidLeadRows.map((lead) => ({
    _id: lead._id,
    source: 'lead',
    studentId: null,
    studentName: lead.name || '',
    email: lead.email || '',
    courseId: lead.courseId || null,
    courseName: lead.courseName || '',
    consultationType: lead.consultationType || 'Consultation',
    mobile: lead.phone || '',
    preferredDatetime: null,
    notes: lead.message || '',
    amount: lead.amount || lead.quotedAmount || null,
    paymentStatus: lead.paymentStatus || 'NOT REQUIRED',
    status: lead.status || 'Pending',
    bookingMode: lead.bookingMode,
    createdAt: lead.submittedAt || lead.createdAt,
  }));

  const consultations = [...leadConsultations, ...studentConsultations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ success: true, consultations });
});

// @desc    Update consultation status
// @route   PUT /api/admin/consultations/:id
export const updateConsultation = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const consultation = await Consultation.findById(req.params.id);

  if (!consultation) {
    res.status(404);
    throw new Error('Consultation not found');
  }

  consultation.status = status || consultation.status;
  await consultation.save();

  res.json({ success: true, consultation });
});

// @desc    Get all users (students)
// @route   GET /api/admin/users
export const getAdminUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'student' }).sort('-createdAt').lean();
  const userIds = users.map((u) => u._id);

  const enrollments = await Enrollment.find({
    userId: { $in: userIds },
    isActive: true,
  }).populate('courseId', 'title').lean();

  const coursesByUser = new Map();
  for (const enrollment of enrollments) {
    if (!enrollment.courseId) continue;
    const key = String(enrollment.userId);
    if (!coursesByUser.has(key)) coursesByUser.set(key, []);
    coursesByUser.get(key).push({
      _id: enrollment.courseId._id,
      title: enrollment.courseId.title,
    });
  }

  res.json({
    success: true,
    users: users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile || '',
      enrolledCourses: coursesByUser.get(String(user._id)) || [],
      createdAt: user.createdAt,
    })),
  });
});

// @desc    Get all orders (purchases)
// @route   GET /api/admin/orders
export const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('userId', 'name email mobile')
    .populate('courseId', 'title')
    .sort('-createdAt');

  res.json({
    success: true,
    orders: orders.map((order) => ({
      _id: order._id,
      guestDetails: order.guestDetails || null,
      userId: order.userId || null,
      courseId: order.courseId || null,
      amount: order.amount,
      paymentStatus: mapOrderPaymentStatus(order.paymentStatus),
      razorpay_payment_id: order.razorpayPaymentId || '',
      razorpay_order_id: order.razorpayOrderId || '',
      createdAt: order.createdAt,
    })),
  });
});
