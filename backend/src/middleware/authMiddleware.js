import logger from '../config/logger.js';

export const adminAuth = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET || 'admin123';
  const authHeader = req.headers['x-admin-secret'];
  const authQuery = req.query['x-admin-secret'];

  if ((authHeader && authHeader === adminSecret) || (authQuery && authQuery === adminSecret)) {
    next();
  } else {
    logger.warn(`Unauthorized admin access attempt from IP: ${req.ip}`);
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Admin access required'
    });
  }
};
