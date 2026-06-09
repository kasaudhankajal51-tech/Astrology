import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: {
    type: String,
    enum: ['Webinar', 'Course', 'Consultation', 'Home-Enroll', 'Contact', 'Course-Inquiry'],
    required: true
  },
  leadType: { type: String },
  courseName: { type: String },
  courseType: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  consultationType: { type: String },
  dob: { type: String },
  tob: { type: String },
  pob: { type: String },
  message: { type: String },
  amount: { type: Number },
  paymentFor: { type: String },
  paymentStatus: { type: String, default: 'PENDING' },
  status: { type: String, default: 'Pending' },
  orderId: { type: String },
  transactionId: { type: String },
  failureReason: { type: String },
  razorpayError: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
