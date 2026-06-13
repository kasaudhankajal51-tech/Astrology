import mongoose from 'mongoose';
import Course from './src/models/Course.js';
import dotenv from 'dotenv';

dotenv.config();

const coursesData = [
  {
    title: 'Basic Vedic Astrology Course',
    description: 'Designed for beginners who want to learn the fundamentals of Vedic Astrology from the root level.',
    longDesc: 'Duration: 12–15 Classes\nSchedule: 2 Days per Week\n\nThis course is designed for beginners who want to learn the fundamentals of Vedic Astrology from the root level.\nYou will learn how to read a Kundali and understand planetary effects step-by-step.\n\nThis course builds a strong foundation for further advanced learning.',
    topics: [
      'All Rashis (Zodiac Signs)',
      'All Planets and their effects',
      'All 12 Houses in Kundali',
      'Karak (Significators) and their importance',
      'Nakshatra basics',
      'Types of Kundali / Charts'
    ],
    courseType: 'Live',
    category: 'Vedic Astrology',
    price: 4999,
    validityDays: 180,
    duration: '12-15 Classes',
    level: 'Beginner'
  },
  {
    title: 'Advance Vedic Astrology Course',
    description: 'Learn prediction techniques and advanced astrology concepts used in professional consultations.',
    longDesc: 'Duration: 25–30 Classes\nSchedule: 2 Days per Week\n\nThis course is for students who want to learn prediction techniques and advanced astrology concepts used in professional consultations.\nAfter this course, students can confidently do professional astrology consultation.',
    topics: [
      'Different Yogas in Kundali',
      'Panchang understanding',
      'Sade Saati analysis',
      'Shani Dhaiya',
      'Mangal Dosh',
      'Marriage Predictions',
      'Career Predictions',
      'Financial Predictions',
      'Child Birth Predictions',
      'Divisional Charts (D-9, D-10, D-81 etc.)',
      'Time Rectification',
      'Life Span Predictions',
      'Multiple Marriage Yog',
      'Foreign Settlement Yog',
      'Match Making / Kundali Matching',
      'Muhurat selection',
      'Gemstone Remedies',
      'Other Astrological Remedies',
      'Child Birth Event Timing',
      'Many more advanced and interesting topics'
    ],
    courseType: 'Live',
    category: 'Vedic Astrology',
    price: 9999,
    validityDays: 365,
    duration: '25-30 Classes',
    level: 'Advanced'
  },
  {
    title: 'Tarot Reading Course (Basic to Professional Level)',
    description: 'Learn Tarot Reading from beginner level to professional consultation level.',
    longDesc: 'Duration: 15–18 Classes\nSchedule: 2 Days per Week\n\nThis course is designed for those who want to learn Tarot Reading from beginner level to professional consultation level.\nYou will learn card meanings, intuition, spreads, timing, and consultation techniques.\nThis course is suitable for personal learning as well as professional practice.',
    topics: [
      'Origination and history of Tarot',
      'Types of Tarot cards',
      'Detailed explanation of Major Arcana cards',
      'Detailed explanation of Minor Arcana cards',
      'Detailed explanation of Court cards',
      'All Tarot spreads (3-card spread, Celtic spread, compatibility spread, etc.)',
      'Predictions through Tarot in all aspects of life',
      'Meaning of symbols, colours, and characters in Tarot',
      'Timing through Tarot',
      'How to give proper consultation',
      'Understanding current feelings through Tarot',
      'Past – Present – Future predictions'
    ],
    courseType: 'Live',
    category: 'Tarot',
    price: 5999,
    validityDays: 365,
    duration: '15-18 Classes',
    level: 'All Levels'
  },
  {
    title: 'Face Reading Course (Basic to Advance Level)',
    description: 'Understand a person’s personality, nature, luck, career, and relationships by analyzing facial features.',
    longDesc: 'Duration: 15–18 Classes\nSchedule: 2 Days per Week\n\nFace Reading is an ancient science that helps in understanding a person’s personality, nature, luck, career, and relationships by analyzing facial features.',
    topics: [
      'Introduction to Face Reading',
      'Meaning of different face shapes',
      'Forehead reading',
      'Eyes, eyebrows, nose, lips analysis',
      'Chin, jawline, and ears reading',
      'Mole reading on face',
      'Signs of wealth and success',
      'Signs of marriage delay / relationship issues',
      'Signs of foreign settlement',
      'Timing through face reading',
      'Combination reading for accurate prediction',
      'Professional consultation method'
    ],
    courseType: 'Live',
    category: 'Face Reading',
    price: 4999,
    validityDays: 365,
    duration: '15-18 Classes',
    level: 'All Levels'
  },
  {
    title: 'Graphology Course (Basic to Advance Level)',
    description: 'Learn the science of handwriting analysis which reveals personality, thinking pattern, and future tendencies.',
    longDesc: 'Including Signature Analysis\nDuration: 15–18 Classes\nSchedule: 2 Days per Week\n\nGraphology is the science of handwriting analysis which reveals personality, thinking pattern, confidence, emotions, and future tendencies.',
    topics: [
      'Introduction to Graphology',
      'Handwriting basics',
      'Size, slant, spacing analysis',
      'Pressure and stroke reading',
      'Signature analysis in detail',
      'Personality prediction through writing',
      'Relationship nature through handwriting',
      'Career and success indications',
      'Detecting stress / anger / fear',
      'Improving signature for success',
      'Practical case studies',
      'Professional consultation method'
    ],
    courseType: 'Live',
    category: 'Graphology',
    price: 5999,
    validityDays: 365,
    duration: '15-18 Classes',
    level: 'All Levels'
  },
  {
    title: 'Basic Vedic Numerology Course',
    description: 'Understand life path, personality, luck, and future through numbers.',
    longDesc: 'Duration: 10 Classes\nSchedule: 2 Days per Week\n\nNumerology helps in understanding life path, personality, luck, and future through numbers.\nThis course is perfect for beginners.',
    topics: [
      'Introduction to Numerology',
      'Life path number',
      'Destiny number',
      'Name number',
      'Friendly and enemy numbers',
      'Lucky numbers',
      'Basic predictions through numbers',
      'Name correction basics'
    ],
    courseType: 'Live',
    category: 'Numerology',
    price: 3999,
    validityDays: 180,
    duration: '10 Classes',
    level: 'Beginner'
  },
  {
    title: 'Advance Vedic Numerology Course',
    description: 'Learn advanced prediction techniques used in professional numerology consultation.',
    longDesc: 'Duration: 15–18 Classes\nSchedule: 2 Days per Week\n\nThis course teaches advanced prediction techniques used in professional numerology consultation.',
    topics: [
      'Advanced number combinations',
      'Detailed name correction',
      'Business name numerology',
      'Mobile number analysis',
      'Vehicle number analysis',
      'Marriage compatibility through numbers',
      'Career and finance prediction',
      'Timing through numerology',
      'Remedies through numbers',
      'Practical case studies',
      'Professional consultation training'
    ],
    courseType: 'Recorded',
    category: 'Numerology',
    price: 6999,
    validityDays: 365,
    duration: '15-18 Classes',
    level: 'Advanced'
  },
  {
    title: 'Palmistry Course (Basic to Advance Level)',
    description: 'Predict life events, nature, career, marriage, and health by reading palm lines.',
    longDesc: 'Duration: 15–18 Classes\nSchedule: 2 Days per Week\n\nPalmistry helps in predicting life events, nature, career, marriage, and health by reading palm lines and hand structure.',
    topics: [
      'Introduction to Palmistry',
      'Types of hands',
      'Major lines (Life, Head, Heart, Fate)',
      'Minor lines reading',
      'Mounts in palm',
      'Marriage line analysis',
      'Career and finance indications',
      'Foreign travel signs',
      'Health indications',
      'Timing through palm',
      'Combination reading',
      'Professional consultation method'
    ],
    courseType: 'Recorded',
    category: 'Palmistry',
    price: 5999,
    validityDays: 365,
    duration: '15-18 Classes',
    level: 'All Levels'
  },
  {
    title: 'Candle Spell Course',
    description: 'Learn the correct method of performing candle spells for positive results.',
    longDesc: 'Duration: 7 Classes\nSchedule: 1 Class per Day\n\nThis course teaches the correct method of performing candle spells for positive results.\nThis course is useful for spiritual practice and personal use.',
    topics: [
      'Introduction to candle magic',
      'Types of candles and colors',
      'Intention setting',
      'Protection methods',
      'Love spell basics',
      'Money spell basics',
      'Cleansing rituals',
      'Manifestation techniques',
      'Safety rules',
      'How to perform spell correctly'
    ],
    courseType: 'Recorded',
    category: 'Spell Casting',
    price: 2999,
    validityDays: 180,
    duration: '7 Classes',
    level: 'Beginner'
  },
  {
    title: 'Astro-Vastu Shastra Course (Basic to Advance Level)',
    description: 'Learn Astro-Vastu to correct life problems by balancing planetary and space energy.',
    longDesc: 'Duration: 30–35 Classes\nSchedule: 2 Days per Week\n\nAstro-Vastu is the combination of Vedic Astrology and Vastu Shastra, used to correct life problems by balancing planetary energy and space energy.',
    topics: [
      'Introduction to Vastu Shastra',
      'Directions and their importance',
      'Vastu rules for home',
      'Vastu rules for office / business',
      'Kitchen, bedroom, temple placement',
      'Toilet and staircase Vastu',
      'Plot selection rules',
      'Astro-Vastu connection',
      'Planetary defects and Vastu correction',
      'Remedies without demolition',
      'Color remedies',
      'Symbol remedies',
      'Practical case studies',
      'Professional consultation method'
    ],
    courseType: 'Recorded',
    category: 'Vastu',
    price: 11999,
    validityDays: 365,
    duration: '30-35 Classes',
    level: 'All Levels'
  },
  {
    title: 'Laal Kitab Course (Basic to Advance Level)',
    description: 'Master Laal Kitab, one of the most powerful systems of astrology known for simple but effective remedies.',
    longDesc: 'Duration: 40–45 Classes\nSchedule: 2 Days per Week\n\nLaal Kitab is one of the most powerful systems of astrology known for its simple but effective remedies.',
    topics: [
      'Introduction to Laal Kitab',
      'Differences between Vedic & Laal Kitab',
      'House based predictions',
      'Planet in different houses',
      'Good and bad results of planets',
      'Understanding debts of planets',
      'Marriage predictions in Laal Kitab',
      'Career and finance predictions',
      'Health indications',
      'Remedies according to Laal Kitab',
      'Practical remedies method',
      'Combination predictions',
      'Case studies',
      'Professional consultation method'
    ],
    courseType: 'Recorded',
    category: 'Astrology',
    price: 14999,
    validityDays: 365,
    duration: '40-45 Classes',
    level: 'All Levels'
  },
  {
    title: 'Crystal Healing & Dowsing Technique Course',
    description: 'Learn how to use crystals for healing, protection, energy balance, and manifestation.',
    longDesc: 'Duration: 10–12 Classes\nSchedule: 2 Days per Week\n\nThis course teaches how to use crystals for healing, protection, energy balance, and manifestation.',
    topics: [
      'Introduction to crystals',
      'Types of healing crystals',
      'Crystal cleansing methods',
      'Charging crystals',
      'Using crystals for protection',
      'Using crystals for money & success',
      'Using crystals for love & relationship',
      'Chakra healing with crystals',
      'Introduction to dowsing',
      'Pendulum use',
      'Yes / No answers through dowsing',
      'Energy checking techniques',
      'Practical sessions'
    ],
    courseType: 'Recorded',
    category: 'Healing',
    price: 4999,
    validityDays: 180,
    duration: '10-12 Classes',
    level: 'All Levels'
  },
  {
    title: 'Akashic Records Course (Basic to Advance Level)',
    description: 'Discover the spiritual knowledge of soul history, past life, and karmic patterns.',
    longDesc: 'Duration: 15–18 Classes\nSchedule: 2 Days per Week\n\nAkashic Records is the spiritual knowledge of soul history, past life, and karmic patterns.',
    topics: [
      'Introduction to Akashic Records',
      'What are soul records',
      'How to open Akashic Records',
      'Protection methods',
      'Asking questions correctly',
      'Past life reading',
      'Karma understanding',
      'Relationship karma',
      'Career guidance through records',
      'Healing through Akashic Records',
      'Meditation techniques',
      'Practice sessions'
    ],
    courseType: 'Recorded',
    category: 'Spiritual',
    price: 7999,
    validityDays: 365,
    duration: '15-18 Classes',
    level: 'All Levels'
  },
  {
    title: 'Bhrighu Nandi Nadi Course (Basic to Advance Level)',
    description: 'Master Bhrighu Nandi Nadi, an advanced astrology system used for accurate event prediction.',
    longDesc: 'Duration: 25–30 Classes\nSchedule: 2 Days per Week\n\nBhrighu Nandi Nadi is an advanced astrology system used for accurate event prediction and timing.',
    topics: [
      'Introduction to Nadi Astrology',
      'Planet combinations',
      'Conjunction predictions',
      'Event timing techniques',
      'Marriage prediction through Nadi',
      'Career prediction through Nadi',
      'Finance prediction through Nadi',
      'Child birth prediction',
      'Foreign travel indications',
      'Advanced prediction rules',
      'Practical case studies',
      'Professional consultation method'
    ],
    courseType: 'Recorded',
    category: 'Astrology',
    price: 8999,
    validityDays: 365,
    duration: '25-30 Classes',
    level: 'All Levels'
  },
  {
    title: 'Prashna Kundali Course',
    description: 'Learn Prashna Kundali to make predictions when birth details are not available.',
    longDesc: 'Duration: 10–12 Classes\nSchedule: 2 Days per Week\n\nPrashna Kundali is used when birth details are not available.\nPredictions are made based on the time when the question is asked.',
    topics: [
      'Introduction to Prashna astrology',
      'How to make Prashna chart',
      'Rules of Prashna Kundali',
      'Question based prediction',
      'Marriage questions',
      'Lost item questions',
      'Career questions',
      'Health questions',
      'Yes / No prediction rules',
      'Timing through Prashna',
      'Practical examples'
    ],
    courseType: 'Recorded',
    category: 'Astrology',
    price: 4999,
    validityDays: 180,
    duration: '10-12 Classes',
    level: 'All Levels'
  }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!MONGO_URI) {
      console.error('No MONGO_URI provided in environment variables.');
      process.exit(1);
    }
    
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    for (let courseData of coursesData) {
      // Ensure unique slug
      const baseSlug = courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      let slug = baseSlug;
      let counter = 1;
      
      while (await Course.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      courseData.slug = slug;
      
      const newCourse = new Course(courseData);
      await newCourse.save();
      console.log(`Added course: ${courseData.title} as ${courseData.courseType}`);
    }
    
    console.log('Finished adding courses!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
