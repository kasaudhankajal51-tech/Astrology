import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  validUntil: { type: Date, required: true },
  purchasedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  progress: {
    completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseVideo' }]
  }
});

export default mongoose.model('Enrollment', EnrollmentSchema);
