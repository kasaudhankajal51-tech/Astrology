import app from './src/app.js';
import mongoose from 'mongoose';
import logger from './src/config/logger.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/astrology";

/**
 * --- Database Connection ---
 * Optimized for serverless and production stability
 */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connections[0].readyState;
    logger.info("✅ MongoDB Connected Successfully");
  } catch (error) {
    logger.error("❌ MongoDB Connection Error:", error);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`🚀 Production Server Live on Port ${PORT}`);
    logger.info(`Mode: ${process.env.NODE_ENV || 'development'}`);
  });
};

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Keep server running but log error
});

startServer();

export default app;
