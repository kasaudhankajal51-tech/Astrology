import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  validityDays: { type: Number, required: true },
  thumbnailUrl: { type: String },
  courseType: { type: String, enum: ['Live', 'Recorded'], default: 'Recorded' },
  launchDate: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', CourseSchema);
