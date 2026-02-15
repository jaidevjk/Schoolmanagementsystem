import express from 'express';
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);
router.get('/', role('admin', 'teacher', 'student'), getAllSubjects);
router.get('/:id', role('admin', 'teacher', 'student'), getSubjectById);
router.post('/', role('admin'), createSubject);
router.put('/:id', role('admin'), updateSubject);
router.delete('/:id', role('admin'), deleteSubject);

export default router;
