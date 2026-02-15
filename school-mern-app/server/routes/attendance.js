import express from 'express';
import {
  getAttendance,
  getMyAttendance,
  markAttendance,
  bulkMarkAttendance,
} from '../controllers/attendanceController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', protect, role('student'), getMyAttendance);

router.use(protect);
router.get('/', role('admin', 'teacher'), getAttendance);
router.post('/', role('admin', 'teacher'), markAttendance);
router.post('/bulk', role('admin', 'teacher'), bulkMarkAttendance);

export default router;
