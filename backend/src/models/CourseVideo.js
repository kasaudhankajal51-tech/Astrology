import mongoose from 'mongoose';

const CourseVideoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  bunnyVideoId: { type: String, required: false },
  vdoCipherVideoId: { type: String, required: false },
  videoProvider: { type: String, enum: ['bunny', 'vdocipher'], default: 'bunny' },
  bunnyLibraryId: { type: String, default: '' },
  bunnyStatus: { type: Number, default: null },
  bunnyEncodeProgress: { type: Number, default: null },
  sourceType: { type: String, enum: ['bunny-id', 'upload'], default: 'bunny-id' },
  sortOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CourseVideo', CourseVideoSchema);
