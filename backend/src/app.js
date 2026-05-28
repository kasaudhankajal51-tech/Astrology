import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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
import newsletterRoutes from './routes/newsletterRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import logger from './config/logger.js';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(morgan('dev'));

// Required for express-rate-limit & correct IP behind Vercel's proxy
app.set('trust proxy', 1);

// --- Essential Middleware ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="' + path.basename(filePath) + '"');
    } else if (ext === '.doc' || ext === '.docx') {
      res.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(filePath) + '"');
    }
  }
}));

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
const apiRoutes = [
  ['/tools', toolsRoutes],
  ['/consultation', consultationRoutes],
  ['/tarot', tarotRoutes],
  ['/love', loveRoutes],
  ['/leads', leadRoutes],
  ['/blogs', blogRoutes],
  ['/jobs', jobRoutes],
  ['/auth', authRoutes],
  ['/admin', adminRoutes],
  ['/settings', settingsRoutes],
  ['/newsletter', newsletterRoutes],
  ['/courses', courseRoutes],
  ['/student', studentRoutes],
  ['/payment', paymentRoutes]
];

apiRoutes.forEach(([path, route]) => {
  app.use(`/api${path}`, route);
  app.use(`${path}`, route); // Fallback for when Nginx strips the /api prefix
});

// --- Error Handling ---
app.use(notFound);
app.use(errorHandler);

export default app;
