import express from 'express';
import { getDashboardStats } from '../controllers/adminController.js';
import { adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', adminAuth, getDashboardStats);

export default router;
