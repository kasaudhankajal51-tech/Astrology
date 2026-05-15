import JobApplication from '../models/JobApplication.js';
import Job from '../models/Job.js';
import asyncHandler from 'express-async-handler';

// --- JOB POSTINGS (Public/Admin) ---

// @desc    Get all active jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
  res.json({ success: true, jobs });
});

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private/Admin
export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, job });
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    Object.assign(job, req.body);
    const updatedJob = await job.save();
    res.json({ success: true, job: updatedJob });
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    await job.deleteOne();
    res.json({ success: true, message: 'Job removed' });
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});


// --- JOB APPLICATIONS ---

// @desc    Submit a job application
// @route   POST /api/jobs/apply
// @access  Public
export const applyForJob = asyncHandler(async (req, res) => {
  const { 
    fullName, email, phone, city, totalExperience, 
    currentOccupation, astrologyExperience, specialization, 
    currentSalary, expectedSalary, noticePeriod, languages, 
    coverMessage, appliedRole 
  } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error('Resume file is required');
  }

  const application = await JobApplication.create({
    fullName, email, phone, city, totalExperience,
    currentOccupation, astrologyExperience, specialization,
    currentSalary, expectedSalary, noticePeriod, languages,
    coverMessage, appliedRole,
    resumeUrl: `/uploads/resumes/${req.file.filename}`
  });

  res.status(201).json({ success: true, application });
});

// @desc    Get all applications (Admin)
// @route   GET /api/jobs/applications
// @access  Private/Admin
export const getApplications = asyncHandler(async (req, res) => {
  const { role, specialization, search } = req.query;
  let query = {};

  if (role) query.appliedRole = role;
  if (specialization) query.specialization = specialization;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  const applications = await JobApplication.find(query).sort({ createdAt: -1 });
  res.json({ success: true, applications });
});

// @desc    Update application status
// @route   PUT /api/jobs/applications/:id
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
// @route   DELETE /api/jobs/applications/:id
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
