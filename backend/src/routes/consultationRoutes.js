import express from 'express';
import { submitConsultation, getConsultations, getStats } from '../controllers/consultationController.js';

const router = express.Router();

router.post('/', submitConsultation);
router.get('/', getConsultations);
router.get('/stats', getStats);

export default router;
