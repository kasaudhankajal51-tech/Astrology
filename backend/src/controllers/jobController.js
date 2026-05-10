import JobApplication from '../models/JobApplication.js';
import asyncHandler from 'express-async-handler';

// @desc    Submit a job application
// @route   POST /api/jobs/apply
// @access  Public
export const applyForJob = asyncHandler(async (req, res) => {
  const { name, email, phone, position, experience, resume, message } = req.body;

  const application = await JobApplication.create({
    name, email, phone, position, experience, resume, message
  });

  res.status(201).json({ success: true, application });
});

// @desc    Get all applications (Admin)
// @route   GET /api/jobs
// @access  Private/Admin
export const getApplications = asyncHandler(async (req, res) => {
  const applications = await JobApplication.find({}).sort({ createdAt: -1 });
  res.json({ success: true, applications });
});

// @desc    Update application status
// @route   PUT /api/jobs/:id
// @access  Private/Admin
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);

  if (application) {
    application.status = req.body.status || application.status;
    const updatedApplication = await application.save();
    res.json({ success: true, application: updatedApplication });
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

// @desc    Delete application
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);
  if (application) {
    await application.deleteOne();
    res.json({ success: true, message: 'Application removed' });
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});
