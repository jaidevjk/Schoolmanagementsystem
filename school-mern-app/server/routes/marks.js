import express from 'express';
import {
  getMarks,
  getMyMarks,
  createMarks,
  bulkUpdateMarks,
  updateMarks,
  deleteMarks,
} from '../controllers/marksController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();
router.get('/me', protect, role('student'), getMyMarks);

router.use(protect);
router.get('/', role('admin', 'teacher'), getMarks);
router.post('/', role('admin', 'teacher'), createMarks);
router.post('/bulk', role('admin', 'teacher'), bulkUpdateMarks);
router.put('/:id', role('admin', 'teacher'), updateMarks);
router.delete('/:id', role('admin', 'teacher'), deleteMarks);

export default router;
