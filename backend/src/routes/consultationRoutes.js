import express from 'express';
import { submitConsultation, getConsultations, getStats, verifyPayment } from '../controllers/consultationController.js';

const router = express.Router();

router.post('/', submitConsultation);
router.post('/verify-payment', verifyPayment);
router.get('/', getConsultations);
router.get('/stats', getStats);

export default router;
