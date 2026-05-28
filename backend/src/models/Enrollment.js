import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  validUntil: { type: Date, required: true },
  purchasedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Enrollment', EnrollmentSchema);
