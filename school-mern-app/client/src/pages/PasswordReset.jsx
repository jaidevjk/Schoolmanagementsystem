import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PasswordReset.css';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

const PasswordReset = () => {
    const [activeTab, setActiveTab] = useState('request');
    const [userRole, setUserRole] = useState('');
    const [requestReason, setRequestReason] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [approvalReason, setApprovalReason] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [userHistory, setUserHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
        if (role === 'admin' || role === 'teacher') {
            loadPendingRequests();
        }
        loadUserHistory();
    }, []);

    const showMessage = (msg, type = 'info') => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 5000);
    };

    const loadPendingRequests = async () => {
        try {
            setLoading(true);
            const response = await api.get('/password-reset/pending');
            setPendingRequests(response.data.requests);
        } catch (err) {
            console.error('Error loading requests:', err);
            showMessage('Error loading pending requests', 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadUserHistory = async () => {
        try {
            const response = await api.get('/password-reset/history');
            setUserHistory(response.data.requests);
        } catch (err) {
            console.error('Error loading history:', err);
        }
    };

    const handleRequestReset = async (e) => {
        e.preventDefault();
        if (!requestReason.trim()) {
            showMessage('Please provide a reason for password reset', 'error');
            return;
        }

        try {
            setLoading(true);
            const response = await api.post('/password-reset/request', { reason: requestReason });
            showMessage(response.data.message, 'success');
            setRequestReason('');
            loadUserHistory();
        } catch (err) {
            showMessage(err.response?.data?.message || 'Error submitting request', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        if (!approvalReason.trim()) {
            showMessage('Please provide a reason for approval', 'error');
            return;
        }

        try {
            setLoading(true);
            const response = await api.put(`/password-reset/${requestId}/approve`, {
                reason: approvalReason
            });
            showMessage(response.data.message, 'success');
            setApprovalReason('');
            setSelectedRequestId(null);
            loadPendingRequests();
        } catch (err) {
            showMessage(err.response?.data?.message || 'Error approving request', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (requestId) => {
        if (!rejectionReason.trim()) {
            showMessage('Please provide a reason for rejection', 'error');
            return;
        }

        try {
            setLoading(true);
            const response = await api.put(`/password-reset/${requestId}/reject`, {
                reason: rejectionReason
            });
            showMessage(response.data.message, 'success');
            setRejectionReason('');
            setSelectedRequestId(null);
            loadPendingRequests();
        } catch (err) {
            showMessage(err.response?.data?.message || 'Error rejecting request', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e, requestId) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        if (newPassword.length < 6) {
            showMessage('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            setLoading(true);
            const response = await api.post('/password-reset/reset-password', {
                requestId,
                newPassword
            });
            showMessage(response.data.message, 'success');
            setNewPassword('');
            setConfirmPassword('');
            loadUserHistory();
        } catch (err) {
            showMessage(err.response?.data?.message || 'Error resetting password', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="password-reset-container">
            <div className="password-reset-card">
                <h1>Password Management</h1>

                {message && (
                    <div className={`message message-${messageType}`}>
                        {message}
                    </div>
                )}

                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
                        onClick={() => setActiveTab('request')}
                    >
                        Request Reset
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        My History
                    </button>
                    {(userRole === 'admin' || userRole === 'teacher') && (
                        <button
                            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            Pending Requests ({pendingRequests.length})
                        </button>
                    )}
                </div>

                {/* Request Reset Tab */}
                {activeTab === 'request' && (
                    <div className="tab-content">
                        <h2>Request Password Reset</h2>
                        <form onSubmit={handleRequestReset}>
                            <div className="form-group">
                                <label>Reason for Reset *</label>
                                <textarea
                                    value={requestReason}
                                    onChange={(e) => setRequestReason(e.target.value)}
                                    placeholder="Explain why you need to reset your password (e.g., forgot password, security concern)"
                                    rows="4"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                            <p className="info-text">
                                ℹ️ {userRole === 'teacher'
                                    ? 'Your request will be reviewed by an admin.'
                                    : 'Your request will be reviewed by admin and your class teacher.'}
                            </p>
                        </form>
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="tab-content">
                        <h2>Request History</h2>
                        {userHistory.length === 0 ? (
                            <p>No password reset requests yet.</p>
                        ) : (
                            <div className="requests-list">
                                {userHistory.map((req) => (
                                    <div key={req._id} className={`request-item status-${req.status}`}>
                                        <div className="request-header">
                                            <span className={`status-badge ${req.status}`}>{req.status.toUpperCase()}</span>
                                            <span className="request-date">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p><strong>Reason:</strong> {req.reason}</p>
                                        <p><strong>Approvals Needed:</strong> {req.maxApprovalsNeeded}</p>
                                        <p><strong>Current Approvals:</strong> {req.approvers.length}</p>

                                        {req.approvers.length > 0 && (
                                            <div className="approvers-info">
                                                <strong>Approval History:</strong>
                                                {req.approvers.map((app, idx) => (
                                                    <div key={idx} className="approval-entry">
                                                        <span className={`action ${app.action}`}>{app.action.toUpperCase()}</span>
                                                        <span>{app.approverRole}</span>
                                                        <span>{app.reason}</span>
                                                        <span className="date">{new Date(app.actionDate).toLocaleDateString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {req.status === 'approved' && (
                                            <form onSubmit={(e) => handleResetPassword(e, req._id)} className="reset-form">
                                                <div className="form-group">
                                                    <label>New Password *</label>
                                                    <input
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="Enter new password"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Confirm Password *</label>
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder="Confirm new password"
                                                        required
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-success" disabled={loading}>
                                                    {loading ? 'Resetting...' : 'Reset Password Now'}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Pending Requests Tab */}
                {(userRole === 'admin' || userRole === 'teacher') && activeTab === 'pending' && (
                    <div className="tab-content">
                        <h2>Pending Password Reset Requests</h2>
                        {pendingRequests.length === 0 ? (
                            <p>No pending requests.</p>
                        ) : (
                            <div className="requests-list">
                                {pendingRequests.map((req) => (
                                    <div key={req._id} className="request-item pending">
                                        <div className="request-header">
                                            <h3>{req.userId.name}</h3>
                                            <span className="role-badge">{req.userId.role}</span>
                                            <span className="request-date">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p><strong>Email:</strong> {req.userId.email}</p>
                                        <p><strong>Reason:</strong> {req.reason}</p>
                                        <p><strong>Approvals Needed:</strong> {req.maxApprovalsNeeded}</p>
                                        <p><strong>Current Approvals:</strong> {req.approvers.length}</p>

                                        {selectedRequestId === req._id ? (
                                            <div className="approval-section">
                                                <div className="form-group">
                                                    <label>Approval Reason *</label>
                                                    <textarea
                                                        value={approvalReason}
                                                        onChange={(e) => setApprovalReason(e.target.value)}
                                                        placeholder="Enter reason for approval"
                                                        rows="3"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Or Rejection Reason *</label>
                                                    <textarea
                                                        value={rejectionReason}
                                                        onChange={(e) => setRejectionReason(e.target.value)}
                                                        placeholder="Enter reason for rejection"
                                                        rows="3"
                                                    />
                                                </div>
                                                <div className="button-group">
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => handleApprove(req._id)}
                                                        disabled={loading || !approvalReason.trim()}
                                                    >
                                                        {loading ? 'Processing...' : 'Approve'}
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleReject(req._id)}
                                                        disabled={loading || !rejectionReason.trim()}
                                                    >
                                                        {loading ? 'Processing...' : 'Reject'}
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            setSelectedRequestId(null);
                                                            setApprovalReason('');
                                                            setRejectionReason('');
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setSelectedRequestId(req._id)}
                                            >
                                                Review Request
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordReset;
