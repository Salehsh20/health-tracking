import express from 'express';
import { 
  getMeals, 
  createMeal, 
  updateMeal, 
  deleteMeal,
  mealValidation 
} from '../controllers/mealController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.get('/', getMeals);
router.post('/', mealValidation, createMeal);
router.put('/:id', mealValidation, updateMeal);
router.delete('/:id', deleteMeal);

export default router;
