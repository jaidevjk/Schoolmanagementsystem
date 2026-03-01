import mongoose from 'mongoose';

const passwordResetRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher/Student who requested
    requestedByRole: { type: String, enum: ['teacher', 'student'], required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvers: [{
        approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        approverRole: { type: String, enum: ['admin', 'teacher'] },
        action: { type: String, enum: ['approved', 'rejected'] },
        reason: { type: String },
        actionDate: { type: Date, default: Date.now }
    }],
    maxApprovalsNeeded: { type: Number, default: 1 }, // 1 for teacher, 2 for student (admin + teacher)
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } // 7 days
}, { timestamps: true });

export default mongoose.model('PasswordResetRequest', passwordResetRequestSchema);
