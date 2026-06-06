import app from './src/app.js';
import mongoose from 'mongoose';
import logger from './src/config/logger.js';
import './src/config/env.js';
import { checkBunnyConnection } from './src/utils/bunnyHelper.js';
import { getRazorpayConfig } from './src/utils/razorpayConfig.js';

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
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = db.connections[0].readyState;
    logger.info("✅ MongoDB Connected Successfully");
  } catch (error) {
    logger.error("❌ MongoDB Connection Error:", error);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

const logBunnyConnection = async () => {
  try {
    const { libraryId } = await checkBunnyConnection();
    logger.info(`✅ Bunny.net Stream connected (Library ${libraryId})`);
  } catch (error) {
    logger.error(`❌ Bunny.net Stream not connected: ${error.message}`);
  }
};

const logRazorpayConnection = () => {
  try {
    const { keyId } = getRazorpayConfig();
    const maskedKey = `${keyId.slice(0, 8)}...${keyId.slice(-4)}`;
    logger.info(`Razorpay configured (${maskedKey})`);
  } catch (error) {
    logger.error(`Razorpay not configured: ${error.message}`);
  }
};

// Start Server
const startServer = async () => {
  logger.info('Backend startup: starting HTTP server...');
  
  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`🚀 Production Server Live on Port ${PORT}`);
    logger.info(`Mode: ${process.env.NODE_ENV || 'development'}`);
    logRazorpayConnection();
    logBunnyConnection();
  });

  connectDB().catch((error) => {
    logger.error(`MongoDB background connection failed: ${error.message}`);
  });
};

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Keep server running but log error
});

startServer();

export default app;
