import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import toolsRoutes from './routes/toolsRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import tarotRoutes from './routes/tarotRoutes.js';
import loveRoutes from './routes/loveRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import logger from './config/logger.js';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(morgan('dev'));

// Required for express-rate-limit & correct IP behind Vercel's proxy
app.set('trust proxy', 1);

// --- Essential Middleware ---
app.use(cors()); // Allow all CORS
app.use(express.json());

// --- DB Connection (Serverless-safe singleton) ---
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  
  const uri = process.env.MONGO_URI;
  if (!uri) {
    logger.error('❌ MONGO_URI is not defined in environment variables');
    return;
  }

  try {
    const db = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    isConnected = db.connections[0].readyState === 1;
    logger.info('✅ MongoDB Connected');
  } catch (err) {
    logger.error('❌ MongoDB Error:', err.message);
    // Don't throw here to allow non-DB routes (like health) to work
  }
};

// Health Check (Unprotected by DB middleware but still attempts connection)
app.get('/health', async (req, res) => {
  await connectDB();
  res.json({ 
    success: true, 
    message: 'Astrology API is live.', 
    db: isConnected ? 'connected' : 'disconnected',
    env: process.env.NODE_ENV,
    timestamp: new Date()
  });
});

// Ensure DB is connected on every request (safe for serverless cold starts)
app.use(async (req, res, next) => {
  // We don't await here to avoid blocking requests if the DB is down, 
  // but individual controllers should check connection if they need it.
  // Actually, for Tarot, we NEED the connection.
  await connectDB();
  next();
});

// --- API Routes ---
app.use('/api/tools', toolsRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/tarot', tarotRoutes);
app.use('/api/love', loveRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);



// --- Error Handling ---
app.use(notFound);
app.use(errorHandler);

export default app;
