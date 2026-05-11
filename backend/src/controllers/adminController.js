import Lead from '../models/leadModel.js';
import Blog from '../models/Blog.js';
import JobApplication from '../models/JobApplication.js';
import asyncHandler from 'express-async-handler';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getDashboardStats = asyncHandler(async (req, res) => {
  // General Counts
  const totalLeadsCount = await Lead.countDocuments();
  const activeBlogsCount = await Blog.countDocuments();
  const expertNetworkCount = await JobApplication.countDocuments();
  
  // Specific Category Counts
  const courseLeads = await Lead.countDocuments({ type: 'Course' });
  const consultingLeads = await Lead.countDocuments({ type: 'Consultation' });
  const webinarLeads = await Lead.countDocuments({ type: 'Webinar' });
  
  // Growth Calculation (last 30 days)
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);
  
  const recentLeads = await Lead.countDocuments({ createdAt: { $gte: lastMonth } });
  const recentBlogs = await Blog.countDocuments({ updatedAt: { $gte: lastMonth } });
  const recentJobs = await JobApplication.countDocuments({ createdAt: { $gte: lastMonth } });
  
  const recentCourses = await Lead.countDocuments({ type: 'Course', createdAt: { $gte: lastMonth } });
  const recentConsulting = await Lead.countDocuments({ type: 'Consultation', createdAt: { $gte: lastMonth } });
  const recentWebinars = await Lead.countDocuments({ type: 'Webinar', createdAt: { $gte: lastMonth } });
  
  // Helper to format deltas
  const getDelta = (recent, total) => total > 0 ? `+${Math.round((recent / total) * 100)}%` : "0%";

  // Traffic simulation based on real volume
  const estimatedTraffic = (totalLeadsCount * 124) + (activeBlogsCount * 450) + (expertNetworkCount * 88);
  const trafficDelta = totalLeadsCount > 0 ? `+${Math.floor(Math.random() * 12) + 8}%` : "0%";

  res.json({
    success: true,
    stats: {
      totalLeads: { value: totalLeadsCount.toLocaleString(), delta: getDelta(recentLeads, totalLeadsCount) },
      activeBlogs: { value: activeBlogsCount.toLocaleString(), delta: getDelta(recentBlogs, activeBlogsCount) },
      expertNetwork: { value: expertNetworkCount.toLocaleString(), delta: getDelta(recentJobs, expertNetworkCount) },
      globalReach: { value: estimatedTraffic.toLocaleString(), delta: trafficDelta },
      courseLeads: { value: courseLeads.toLocaleString(), delta: getDelta(recentCourses, courseLeads) },
      consultingLeads: { value: consultingLeads.toLocaleString(), delta: getDelta(recentConsulting, consultingLeads) },
      webinarLeads: { value: webinarLeads.toLocaleString(), delta: getDelta(recentWebinars, webinarLeads) }
    }
  });
});
