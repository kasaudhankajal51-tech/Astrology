import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String },
  badge: { type: String },
  badgeColor: { type: String },
  img: { type: String },
  short: { type: String }
});

const consultationCategorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String },
  description: { type: String },
  cards: [cardSchema],
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

const ConsultationCategory = mongoose.model("ConsultationCategory", consultationCategorySchema);

export default ConsultationCategory;
