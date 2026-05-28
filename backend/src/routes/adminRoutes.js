import express from 'express';
import { getDashboardStats, getConsultations, updateConsultation } from '../controllers/adminController.js';
import { adminAuth } from '../middleware/authMiddleware.js';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  addCourseVideo,
  reorderVideos,
  deleteCourseVideo
} from '../controllers/courseController.js';

const router = express.Router();

router.get('/stats', adminAuth, getDashboardStats);

// Course Management (Admin)
router.post('/courses', adminAuth, createCourse);
router.put('/courses/:id', adminAuth, updateCourse);
router.delete('/courses/:id', adminAuth, deleteCourse);

// Course Video Management (Admin)
router.post('/courses/:id/videos', adminAuth, addCourseVideo);
router.put('/courses/:id/videos/reorder', adminAuth, reorderVideos);
router.delete('/courses/:id/videos/:vid', adminAuth, deleteCourseVideo);

// Consultation Management (Admin)
router.get('/consultations', adminAuth, getConsultations);
router.put('/consultations/:id', adminAuth, updateConsultation);

export default router;
