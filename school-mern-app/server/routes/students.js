import express from 'express';
import {
  getAllStudents,
  getStudentById,
  getMyProfile,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', protect, role('student'), getMyProfile);

router.use(protect);
router.get('/', role('admin', 'teacher'), getAllStudents);
router.get('/:id', role('admin', 'teacher'), getStudentById);
router.post('/', role('admin'), createStudent);
router.put('/:id', role('admin'), updateStudent);
router.delete('/:id', role('admin'), deleteStudent);

export default router;
