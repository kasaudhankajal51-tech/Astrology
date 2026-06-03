import express from 'express';
import multer from 'multer';
import { getDashboardStats, getConsultations, updateConsultation } from '../controllers/adminController.js';
import { adminAuth } from '../middleware/authMiddleware.js';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  addCourseVideo,
  uploadCourseVideo,
  updateCourseVideo,
  getAdminCourseVideoPreview,
  reorderVideos,
  deleteCourseVideo
} from '../controllers/courseController.js';

const router = express.Router();
const videoUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype?.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 1024
  }
});

router.get('/stats', adminAuth, getDashboardStats);

// Course Management (Admin)
router.post('/courses', adminAuth, createCourse);
router.put('/courses/:id', adminAuth, updateCourse);
router.delete('/courses/:id', adminAuth, deleteCourse);

// Course Video Management (Admin)
router.post('/courses/:id/videos', adminAuth, addCourseVideo);
router.post('/courses/:id/videos/upload', adminAuth, videoUpload.single('videoFile'), uploadCourseVideo);
router.put('/courses/:id/videos/reorder', adminAuth, reorderVideos);
router.get('/courses/:id/videos/:vid/preview', adminAuth, getAdminCourseVideoPreview);
router.put('/courses/:id/videos/:vid', adminAuth, videoUpload.single('videoFile'), updateCourseVideo);
router.delete('/courses/:id/videos/:vid', adminAuth, deleteCourseVideo);

// Consultation Management (Admin)
router.get('/consultations', adminAuth, getConsultations);
router.put('/consultations/:id', adminAuth, updateConsultation);

export default router;
