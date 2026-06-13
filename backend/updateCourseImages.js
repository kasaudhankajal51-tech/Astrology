import mongoose from 'mongoose';
import Course from './src/models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

const updates = [
  { title: 'Basic Vedic Astrology Course', url: '/images/vedic_thumbnail.png' },
  { title: 'Advance Vedic Astrology Course', url: '/images/vedic_thumbnail.png' },
  { title: 'Tarot Reading Course (Basic to Professional Level)', url: '/images/tarot_thumbnail.png' },
  { title: 'Face Reading Course (Basic to Advance Level)', url: '/images/face_reading_thumbnail.png' },
  { title: 'Graphology Course (Basic to Advance Level)', url: '/images/graphology_thumbnail.png' },
  { title: 'Basic Vedic Numerology Course', url: '/images/numerology_thumbnail.png' },
  { title: 'Advance Vedic Numerology Course', url: '/images/numerology_thumbnail.png' },
  { title: 'Palmistry Course (Basic to Advance Level)', url: '/images/palmistry_thumbnail.png' },
  { title: 'Candle Spell Course', url: '/images/candle_thumbnail.png' },
  { title: 'Astro-Vastu Shastra Course (Basic to Advance Level)', url: '/images/vastu_thumbnail.png' },
  { title: 'Laal Kitab Course (Basic to Advance Level)', url: '/images/laalkitab_thumbnail.png' },
  { title: 'Crystal Healing & Dowsing Technique Course', url: '/images/crystal_thumbnail.png' },
  { title: 'Akashic Records Course (Basic to Advance Level)', url: '/images/akashic_thumbnail.png' },
  { title: 'Bhrighu Nandi Nadi Course (Basic to Advance Level)', url: '/images/vedic_thumbnail.png' },
  { title: 'Prashna Kundali Course', url: '/images/vedic_thumbnail.png' }
];

const updateDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!MONGO_URI) {
      console.error('No MONGO_URI provided in environment variables.');
      process.exit(1);
    }
    
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    for (let data of updates) {
      const result = await Course.updateMany(
        { title: data.title },
        { $set: { thumbnailUrl: data.url } }
      );
      console.log(`Updated ${result.modifiedCount} courses with title "${data.title}" to use image ${data.url}`);
    }
    
    console.log('Finished updating course images!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating data:', error);
    process.exit(1);
  }
};

updateDB();
