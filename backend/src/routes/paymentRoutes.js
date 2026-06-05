import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', optionalAuth, createOrder);
router.post('/verify', verifyPayment);

export default router;
