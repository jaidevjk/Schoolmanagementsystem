import express from 'express';
import {
  getAttendance,
  getMyAttendance,
  markAttendance,
  bulkMarkAttendance,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendanceController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', protect, role('student'), getMyAttendance);

router.use(protect);
router.get('/', role('admin', 'teacher'), getAttendance);
router.post('/', role('admin', 'teacher'), markAttendance);
router.post('/bulk', role('admin', 'teacher'), bulkMarkAttendance);
router.put('/:id', role('admin', 'teacher'), updateAttendance);
router.delete('/:id', role('admin', 'teacher'), deleteAttendance);

export default router;
