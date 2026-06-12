import express from 'express';
import { submitConsultation, getConsultations, getStats, verifyPayment, getCategories } from '../controllers/consultationController.js';

const router = express.Router();

router.get('/categories', getCategories);
router.post('/', submitConsultation);
router.post('/verify-payment', verifyPayment);
router.get('/', getConsultations);
router.get('/stats', getStats);

export default router;
