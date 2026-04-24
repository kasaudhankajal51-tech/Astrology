import express from 'express';
import { createLead, paymentCallback, verifyPayment, getLeads, exportLeads } from '../controllers/leadController.js';
import { adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createLead);
router.post('/payment-callback', paymentCallback);
router.post('/verify-payment', verifyPayment);
router.get('/', adminAuth, getLeads);
router.get('/export', adminAuth, exportLeads);

export default router;
