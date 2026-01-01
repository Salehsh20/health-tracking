import express from 'express';
import { signup, login, getProfile, signupValidation, loginValidation } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

export default router;
