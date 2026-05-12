import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const JWT_SECRET = process.env.JWT_SECRET || 'astro-admin-secret-2026';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (error) {
      logger.warn(`Invalid JWT token attempt from IP: ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token'
      });
    }
  } else {
    logger.warn(`Missing Authorization header from IP: ${req.ip}`);
    res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided'
    });
  }
};
