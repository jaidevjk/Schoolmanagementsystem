import express from 'express';
import {
  getAllStudents,
  getStudentById,
  getMyProfile,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { importStudentsFromExcel, downloadSample } from '../controllers/bulkStudentController.js';
import multer from 'multer';

const upload = multer();
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', protect, role('student'), getMyProfile);

router.use(protect);
router.get('/', role('admin', 'teacher'), getAllStudents);
router.get('/:id', role('admin', 'teacher'), getStudentById);
router.post('/', role('admin', 'teacher'), createStudent);
router.post('/bulk', role('admin', 'teacher'), upload.single('file'), importStudentsFromExcel);
router.get('/bulk/sample', role('admin', 'teacher'), downloadSample);
router.put('/:id', role('admin', 'teacher'), updateStudent);
router.delete('/:id', role('admin', 'teacher'), deleteStudent);

export default router;
