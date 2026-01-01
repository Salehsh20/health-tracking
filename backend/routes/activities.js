import express from 'express';
import { 
  getActivities, 
  createActivity, 
  updateActivity, 
  deleteActivity,
  activityValidation 
} from '../controllers/activityController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.get('/', getActivities);
router.post('/', activityValidation, createActivity);
router.put('/:id', activityValidation, updateActivity);
router.delete('/:id', deleteActivity);

export default router;
