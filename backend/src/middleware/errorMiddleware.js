import logger from '../config/logger.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Detailed logging for production debugging
  logger.error(`[Error Handler] ${err.name || 'Error'}: ${err.message}`);
  if (err.stack && process.env.NODE_ENV !== 'production') {
    logger.error(err.stack);
  }
  logger.error(`Path: ${req.method} ${req.originalUrl} | IP: ${req.ip}`);
  
  res.status(statusCode).json({
    success: false,
    data: null,
    error: err.message || 'An internal server error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
