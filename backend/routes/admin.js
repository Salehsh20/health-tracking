import express from 'express';
import { 
  getAllUsers, 
  getUserStats, 
  deleteUser, 
  updateUserRole 
} from '../controllers/adminController.js';
import { adminMiddleware } from '../middleware/admin.js';

const router = express.Router();

// All routes require admin privileges
router.use(adminMiddleware);

router.get('/users', getAllUsers);
router.get('/stats', getUserStats);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

export default router;
