import mongoose from 'mongoose';
import Course from './src/models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

const updates = [
  { title: 'Advance Vedic Astrology Course', url: '/images/advance_vedic_thumbnail.png' },
  { title: 'Bhrighu Nandi Nadi Course (Basic to Advance Level)', url: '/images/nadi_thumbnail.png' },
  { title: 'Prashna Kundali Course', url: '/images/prashna_thumbnail.png' },
  { title: 'Advance Vedic Numerology Course', url: '/images/advance_numerology_thumbnail.png' }
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
