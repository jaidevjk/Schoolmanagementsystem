import express from 'express';
import {
  getAllTeachers,
  getTeacherById,
  getMyProfile,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacherController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', protect, role('teacher'), getMyProfile);

router.use(protect);
router.get('/', role('admin'), getAllTeachers);
router.get('/:id', role('admin'), getTeacherById);
router.post('/', role('admin'), createTeacher);
router.put('/:id', role('admin'), updateTeacher);
router.delete('/:id', role('admin'), deleteTeacher);

export default router;
