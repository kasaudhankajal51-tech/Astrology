import express from 'express';
import { createLead, paymentCallback, getLeads, exportLeads } from '../controllers/leadController.js';

const router = express.Router();

router.post('/', createLead);
router.post('/payment-callback', paymentCallback);
router.get('/', getLeads);
router.get('/export', exportLeads);

export default router;
