import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  mobile: { type: String, required: true },
  countryCode: { type: String, default: '+91' },
  dob: String,
  tob: String,
  location: String,
  status: { type: String, default: 'pending', enum: ['pending', 'contacted', 'completed', 'cancelled'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  preferredDatetime: { type: Date },
  notes: { type: String },
  bookedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const Consultation = mongoose.model("Consultation", ConsultationSchema);

export default Consultation;
