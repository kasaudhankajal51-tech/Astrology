import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  razorpayOrderId: { type: String },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
