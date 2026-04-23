import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Webinar', 'Course'], required: true },
  courseName: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  transactionId: { type: String },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
