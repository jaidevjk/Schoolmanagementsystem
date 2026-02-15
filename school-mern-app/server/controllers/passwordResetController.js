import PasswordResetRequest from '../models/PasswordResetRequest.js';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';

// Request password reset
export const requestPasswordReset = async (req, res) => {
    try {
        const { reason } = req.body;
        const userId = req.user._id;
        const userRole = req.user.role;

        if (!reason) {
            return res.status(400).json({ message: 'Reason for password reset is required.' });
        }

        // Check if user is inactive - block password reset for inactive accounts
        if (userRole === 'teacher') {
            const teacher = await Teacher.findOne({ userId });
            if (teacher && teacher.status === 'inactive') {
                return res.status(403).json({ message: 'Inactive accounts cannot request password reset.' });
            }
        } else if (userRole === 'student') {
            const student = await Student.findOne({ userId });
            if (student && student.status === 'inactive') {
                return res.status(403).json({ message: 'Inactive accounts cannot request password reset.' });
            }
        } else {
            return res.status(403).json({ message: 'Only teachers and students can request password reset.' });
        }

        // Check if there's already a pending request
        const existingRequest = await PasswordResetRequest.findOne({ userId, status: 'pending' });
        if (existingRequest) {
            return res.status(400).json({ message: 'You already have a pending password reset request.' });
        }

        // Determine approvers needed based on role
        let maxApprovalsNeeded = 1; // Default for teacher (1 admin approval)
        if (userRole === 'student') {
            maxApprovalsNeeded = 2; // For student (admin + teacher approval needed)
        }

        const resetRequest = await PasswordResetRequest.create({
            userId,
            requestedBy: userId,
            requestedByRole: userRole,
            reason,
            maxApprovalsNeeded,
            status: 'pending'
        });

        res.status(201).json({
            message: 'Password reset request submitted. Awaiting admin approval.',
            request: resetRequest
        });
    } catch (err) {
        console.error('Error requesting password reset:', err);
        res.status(500).json({ message: 'Error requesting password reset.', error: err.message });
    }
};

// Get pending password reset requests (for admins and teachers)
export const getPendingRequests = async (req, res) => {
    try {
        const userRole = req.user.role;

        let query = { status: 'pending' };

        // Admins see all pending requests
        if (userRole === 'admin') {
            // Admins see all pending requests
        }
        // Teachers only see pending requests from their students
        else if (userRole === 'teacher') {
            const teacherDoc = await Teacher.findOne({ userId: req.user._id });
            if (!teacherDoc) {
                return res.status(403).json({ message: 'Teacher profile not found.' });
            }
            // Get students taught by this teacher
            const classesTeught = teacherDoc.classIds;
            const studentsInClasses = await Student.find({ classId: { $in: classesTeught } }, '_id userId');
            const studentIds = studentsInClasses.map(s => s.userId);
            query.userId = { $in: studentIds };
            query.requestedByRole = 'student';
        } else {
            return res.status(403).json({ message: 'Only admins and teachers can view requests.' });
        }

        const requests = await PasswordResetRequest.find(query)
            .populate('userId', 'name email role')
            .populate('requestedBy', 'name email')
            .populate('approvers.approverId', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Pending password reset requests',
            count: requests.length,
            requests
        });
    } catch (err) {
        console.error('Error fetching requests:', err);
        res.status(500).json({ message: 'Error fetching requests.', error: err.message });
    }
};

// Approve password reset request
export const approvePasswordReset = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { reason: approvalReason } = req.body;
        const approverId = req.user._id;
        const approverRole = req.user.role;

        if (!['admin', 'teacher'].includes(approverRole)) {
            return res.status(403).json({ message: 'Only admins and teachers can approve requests.' });
        }

        const resetRequest = await PasswordResetRequest.findById(requestId);
        if (!resetRequest) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        if (resetRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Only pending requests can be approved.' });
        }

        // Check authorization
        if (approverRole === 'teacher') {
            if (resetRequest.requestedByRole !== 'student') {
                return res.status(403).json({ message: 'Teachers can only approve student password reset requests.' });
            }
            // Verify teacher teaches the student
            const teacherDoc = await Teacher.findOne({ userId: approverId });
            const student = await Student.findOne({ userId: resetRequest.userId });
            if (!student || !teacherDoc.classIds.includes(student.classId)) {
                return res.status(403).json({ message: 'You can only approve requests from your students.' });
            }
        }

        // Add approval
        resetRequest.approvers.push({
            approverId,
            approverRole,
            action: 'approved',
            reason: approvalReason || 'Approved'
        });

        // Check if all approvals are met
        if (resetRequest.approvers.length >= resetRequest.maxApprovalsNeeded) {
            resetRequest.status = 'approved';
        }

        await resetRequest.save();

        res.json({
            message: resetRequest.status === 'approved'
                ? 'Password reset approved. User can now reset password.'
                : 'Approval recorded. Awaiting additional approvals.',
            request: resetRequest
        });
    } catch (err) {
        console.error('Error approving request:', err);
        res.status(500).json({ message: 'Error approving request.', error: err.message });
    }
};

// Reject password reset request
export const rejectPasswordReset = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { reason: rejectionReason } = req.body;
        const approverId = req.user._id;
        const approverRole = req.user.role;

        if (!['admin', 'teacher'].includes(approverRole)) {
            return res.status(403).json({ message: 'Only admins and teachers can reject requests.' });
        }

        const resetRequest = await PasswordResetRequest.findById(requestId);
        if (!resetRequest) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        if (resetRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Only pending requests can be rejected.' });
        }

        // Check authorization
        if (approverRole === 'teacher') {
            if (resetRequest.requestedByRole !== 'student') {
                return res.status(403).json({ message: 'Teachers can only reject student password reset requests.' });
            }
        }

        resetRequest.status = 'rejected';
        resetRequest.approvers.push({
            approverId,
            approverRole,
            action: 'rejected',
            reason: rejectionReason || 'Rejected'
        });

        await resetRequest.save();

        res.json({
            message: 'Password reset request rejected.',
            request: resetRequest
        });
    } catch (err) {
        console.error('Error rejecting request:', err);
        res.status(500).json({ message: 'Error rejecting request.', error: err.message });
    }
};

// Reset password (only if approved)
export const resetPassword = async (req, res) => {
    try {
        const { requestId, newPassword } = req.body;
        const userId = req.user._id;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        const resetRequest = await PasswordResetRequest.findById(requestId);
        if (!resetRequest) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        if (resetRequest.status !== 'approved') {
            return res.status(403).json({ message: 'This request is not approved.' });
        }

        if (resetRequest.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'This request is not for your account.' });
        }

        // Check if expired
        if (new Date() > resetRequest.expiresAt) {
            resetRequest.status = 'rejected';
            await resetRequest.save();
            return res.status(410).json({ message: 'Request has expired.' });
        }

        // Update password
        const user = await User.findById(userId);
        user.password = newPassword;
        await user.save();

        // Mark request as completed
        resetRequest.status = 'completed';
        await resetRequest.save();

        res.json({ message: 'Password successfully reset. You can now login with your new password.' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ message: 'Error resetting password.', error: err.message });
    }
};

// Get user's reset request history
export const getUserResetHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const requests = await PasswordResetRequest.find({ userId })
            .populate('approvers.approverId', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Your password reset request history',
            requests
        });
    } catch (err) {
        console.error('Error fetching history:', err);
        res.status(500).json({ message: 'Error fetching history.', error: err.message });
    }
};
