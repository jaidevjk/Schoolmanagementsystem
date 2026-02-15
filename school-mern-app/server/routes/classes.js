import express from 'express';
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} from '../controllers/classController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);
router.get('/', role('admin', 'teacher', 'student'), getAllClasses);
router.get('/:id', role('admin', 'teacher', 'student'), getClassById);
router.post('/', role('admin'), createClass);
router.put('/:id', role('admin'), updateClass);
router.delete('/:id', role('admin'), deleteClass);

export default router;
