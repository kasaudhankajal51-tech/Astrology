import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true }, // e.g., "Astrologer", "Content Writer"
  experience: { type: String },
  resume: { type: String }, // URL to resume
  message: { type: String },
  status: { type: String, enum: ['Applied', 'Reviewed', 'Interviewing', 'Selected', 'Rejected'], default: 'Applied' },
}, { timestamps: true });

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
