import express from 'express';
import { 
  applyForJob, 
  getApplications, 
  updateApplicationStatus, 
  deleteApplication 
} from '../controllers/jobController.js';
import { adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply', applyForJob);
router.get('/', adminAuth, getApplications);
router.put('/:id', adminAuth, updateApplicationStatus);
router.delete('/:id', adminAuth, deleteApplication);

export default router;
