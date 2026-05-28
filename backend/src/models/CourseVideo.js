import mongoose from 'mongoose';

const CourseVideoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  bunnyVideoId: { type: String, required: true },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CourseVideo', CourseVideoSchema);
