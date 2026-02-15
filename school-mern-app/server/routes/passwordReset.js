import express from 'express';
import {
    requestPasswordReset,
    getPendingRequests,
    approvePasswordReset,
    rejectPasswordReset,
    resetPassword,
    getUserResetHistory
} from '../controllers/passwordResetController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (requires authentication)
router.use(protect);

// User requests password reset
router.post('/request', requestPasswordReset);

// Get user's reset request history
router.get('/history', getUserResetHistory);

// Get pending requests (admin and teachers)
router.get('/pending', getPendingRequests);

// Admin/Teacher approves password reset request
router.put('/:requestId/approve', approvePasswordReset);

// Admin/Teacher rejects password reset request
router.put('/:requestId/reject', rejectPasswordReset);

// User resets password after approval
router.post('/reset-password', resetPassword);

export default router;
