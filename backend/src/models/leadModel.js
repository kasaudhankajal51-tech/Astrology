import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Webinar', 'Course', 'Consultation', 'Home-Enroll', 'Contact', 'Course-Inquiry'], required: true },
  courseName: { type: String },
  consultationType: { type: String },
  dob: { type: String },
  tob: { type: String },
  pob: { type: String },
  message: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Done'], default: 'Pending' },
  transactionId: { type: String },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
