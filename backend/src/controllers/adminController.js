import Lead from '../models/leadModel.js';
import Blog from '../models/Blog.js';
import JobApplication from '../models/JobApplication.js';
import asyncHandler from 'express-async-handler';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalLeadsCount = await Lead.countDocuments();
  const activeBlogsCount = await Blog.countDocuments();
  const expertNetworkCount = await JobApplication.countDocuments(); 
  
  // Calculate lead growth (last 30 days)
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);
  const recentLeads = await Lead.countDocuments({ createdAt: { $gte: lastMonth } });
  
  // Dynamic delta calculation
  const leadDelta = totalLeadsCount > 0 ? `+${Math.round((recentLeads / totalLeadsCount) * 100)}%` : "0%";

  res.json({
    success: true,
    stats: {
      totalLeads: { value: totalLeadsCount.toLocaleString(), delta: leadDelta },
      activeBlogs: { value: activeBlogsCount.toLocaleString(), delta: "+5%" }, // Simplified delta
      expertNetwork: { value: expertNetworkCount.toLocaleString(), delta: "+2%" },
      platformTraffic: { value: "85k", delta: "+18%" } // Simulated traffic
    }
  });
});
