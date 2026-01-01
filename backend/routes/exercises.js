import express from 'express';
import { 
  getExercises, 
  createExercise, 
  updateExercise, 
  deleteExercise,
  exerciseValidation 
} from '../controllers/exerciseController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.get('/', getExercises);
router.post('/', exerciseValidation, createExercise);
router.put('/:id', exerciseValidation, updateExercise);
router.delete('/:id', deleteExercise);

export default router;
