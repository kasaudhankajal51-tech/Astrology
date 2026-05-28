import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getMyCourses, getCoursePlayer, bookCourseConsultation } from '../controllers/studentController.js';

const router = express.Router();

router.use(protect); // all routes below require student login

router.get('/courses', getMyCourses);
router.get('/courses/:id/player', getCoursePlayer);
router.post('/consultations', bookCourseConsultation);

export default router;
