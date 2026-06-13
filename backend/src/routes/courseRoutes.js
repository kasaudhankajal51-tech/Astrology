import express from 'express';
import { getActiveCourses, getCourseById } from '../controllers/courseController.js';
import { getPublicCategories } from '../controllers/courseCategoryController.js';

const router = express.Router();

router.get('/categories', getPublicCategories);
router.get('/', getActiveCourses);
router.get('/:id', getCourseById);

export default router;
