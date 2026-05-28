import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many login attempts, please try again after 15 minutes' }
});

router.post('/login', loginLimiter, login);
router.get('/me', protect, getMe);

export default router;
