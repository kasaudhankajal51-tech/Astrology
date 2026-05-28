import express from 'express';
import { getActiveCourses, getCourseById } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getActiveCourses);
router.get('/:id', getCourseById);

export default router;
