import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  totalExperience: { type: String, required: true },
  specialization: { type: String, required: true },
  languages: { type: String },
  resumeUrl: { type: String, required: true },
  appliedRole: { type: String, required: true }, // The job title or ID
  status: { 
    type: String, 
    enum: ['Pending', 'Reviewed', 'Shortlisted', 'Interviewing', 'Selected', 'Rejected'], 
    default: 'Pending' 
  },
  appliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
