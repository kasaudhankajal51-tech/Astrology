import Lead from '../models/leadModel.js';
import Blog from '../models/Blog.js';
import JobApplication from '../models/JobApplication.js';
import Newsletter from '../models/Newsletter.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Consultation from '../models/Consultation.js';
import asyncHandler from 'express-async-handler';

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
      { type: 'Course', paymentStatus: { $in: ['PAID', 'Completed'] } },
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
      { status: 'ENQUIRY RECEIVED' },
      { type: 'Course-Inquiry' },
    ],
  });

  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);

  const recentLeads = await Lead.countDocuments({ createdAt: { $gte: lastMonth } });
  const activeBlogsCount = await Blog.countDocuments();
  const expertNetworkCount = await JobApplication.countDocuments();
  const newsletterSubscribersCount = await Newsletter.countDocuments();
  const recentBlogs = await Blog.countDocuments({ updatedAt: { $gte: lastMonth } });
  const recentJobs = await JobApplication.countDocuments({ createdAt: { $gte: lastMonth } });
  const recentSubscribers = await Newsletter.countDocuments({ createdAt: { $gte: lastMonth } });

  const getDelta = (recent, total) => (total > 0 ? `+${Math.round((recent / total) * 100)}%` : '0%');
  const estimatedTraffic = (totalLeads * 124) + (activeBlogsCount * 450) + (expertNetworkCount * 88);
  const trafficDelta = totalLeads > 0 ? `+${Math.floor(Math.random() * 12) + 8}%` : '0%';

  res.json({
    success: true,
    stats: {
      totalLeads,
      paidConsultations,
      recordedCoursePurchases,
      failedPayments,
      liveCourseEnquiries,
      totalLeadsDetail: { value: totalLeads.toLocaleString(), delta: getDelta(recentLeads, totalLeads) },
      activeBlogs: { value: activeBlogsCount.toLocaleString(), delta: getDelta(recentBlogs, activeBlogsCount) },
      expertNetwork: { value: expertNetworkCount.toLocaleString(), delta: getDelta(recentJobs, expertNetworkCount) },
      globalReach: { value: estimatedTraffic.toLocaleString(), delta: trafficDelta },
      newsletterSubscribers: { value: newsletterSubscribersCount.toLocaleString(), delta: getDelta(recentSubscribers, newsletterSubscribersCount) },
    },
  });
});

// @desc    Get all consultations
// @route   GET /api/admin/consultations
export const getConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find()
    .populate('courseId', 'title')
    .populate('userId', 'name email')
    .sort('-createdAt');

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
  const users = await User.find({ role: 'student' }).sort('-createdAt');
  res.json({ success: true, users });
});

// @desc    Get all orders (purchases)
// @route   GET /api/admin/orders
export const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('userId', 'name email mobile')
    .populate('courseId', 'title')
    .sort('-createdAt');
  res.json({ success: true, orders });
});
