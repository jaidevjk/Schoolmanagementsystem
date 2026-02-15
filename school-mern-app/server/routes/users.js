import express from 'express';
import { getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);
router.get('/', role('admin'), getAllUsers);
router.get('/:id', role('admin'), getUserById);
router.patch('/:id', role('admin'), updateUser);
export default router;
