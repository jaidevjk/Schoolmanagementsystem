import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const logout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/login');
        }
    };

    const loadData = async () => {
        try {
            const res = await fetch("http://localhost:4003/users");
            const result = await res.json();
            const data = result.data || result || [];
            setUsers(data);
            loadTeachers();
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const loadTeachers = async () => {
        try {
            const res = await fetch("http://localhost:4003/admin/teachers");
            const result = await res.json();
            const data = result.data || result || [];
            setTeachers(data);
        } catch (error) {
            console.error("Teachers not loading", error);
        }
    };

    // Actions
    const approveStudent = async (id) => {
        await fetch(`http://localhost:4003/users/approve/${id}`, { method: "PUT" });
        loadData();
    };

    const admitStudent = async (id) => {
        await fetch(`http://localhost:4003/users/admit/${id}`, { method: "PUT" });
        loadData();
    };

    const markOld = async (id) => {
        await fetch(`http://localhost:4003/users/mark-old/${id}`, { method: "PUT" });
        loadData();
    };

    const deleteStudent = async (id) => {
        if (window.confirm("Delete this student?")) {
            await fetch(`http://localhost:4003/users/${id}`, { method: "DELETE" });
            loadData();
        }
    };

    // Filtered Lists
    const pendingStudents = users.filter(u => u.AdmissionStatus === "Pending" && !u.isOldStudent);
    const approvedStudents = users.filter(u => u.AdmissionStatus === "Yet to be Admitted" && !u.isOldStudent);
    const admittedStudents = users.filter(u => u.AdmissionStatus === "Admitted" && !u.isOldStudent);
    const oldStudents = users.filter(u => u.isOldStudent);

    return (
        <div className="min-h-screen bg-[#eef2f7] p-8 font-sans">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* ==================== TEACHERS ==================== */}
            <div className="bg-white p-5 mb-10 rounded-xl shadow-sm border border-gray-100">
                <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Teachers</div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1f2d3d] text-white">
                                <th className="p-3 text-left text-sm font-semibold">Name</th>
                                <th className="p-3 text-left text-sm font-semibold">Email</th>
                                <th className="p-3 text-left text-sm font-semibold">Subject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length > 0 ? teachers.map((t, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-600">{t.name}</td>
                                    <td className="p-3 text-sm text-gray-600">{t.email}</td>
                                    <td className="p-3 text-sm text-gray-600">{t.subject || "-"}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="3" className="p-3 text-center text-gray-500">No teachers found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ==================== PENDING ==================== */}
            <div className="bg-white p-5 mb-10 rounded-xl shadow-sm border border-gray-100">
                <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Pending Applications</div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1f2d3d] text-white">
                                <th className="p-3 text-left text-sm font-semibold">Name</th>
                                <th className="p-3 text-left text-sm font-semibold">Parent</th>
                                <th className="p-3 text-left text-sm font-semibold">Email</th>
                                <th className="p-3 text-left text-sm font-semibold">Grade</th>
                                <th className="p-3 text-left text-sm font-semibold">Status</th>
                                <th className="p-3 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingStudents.length > 0 ? pendingStudents.map((u) => (
                                <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-600">{u.name}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.parentName}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.email}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.grade}</td>
                                    <td className="p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white">Pending</span></td>
                                    <td className="p-3">
                                        <button onClick={() => approveStudent(u._id)} className="mr-2 px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">Approve</button>
                                        <button onClick={() => deleteStudent(u._id)} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="p-3 text-center text-gray-500">No pending applications</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ==================== APPROVED ==================== */}
            <div className="bg-white p-5 mb-10 rounded-xl shadow-sm border border-gray-100">
                <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Approved - Yet to be Admitted</div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1f2d3d] text-white">
                                <th className="p-3 text-left text-sm font-semibold">Name</th>
                                <th className="p-3 text-left text-sm font-semibold">Grade</th>
                                <th className="p-3 text-left text-sm font-semibold">Status</th>
                                <th className="p-3 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedStudents.length > 0 ? approvedStudents.map((u) => (
                                <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-600">{u.name}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.grade}</td>
                                    <td className="p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-500 text-white">Approved</span></td>
                                    <td className="p-3">
                                        <button onClick={() => admitStudent(u._id)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Admit</button>
                                        <button onClick={() => markOld(u._id)} className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600">Mark Old</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="p-3 text-center text-gray-500">No approved students</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ==================== ADMITTED ==================== */}
            <div className="bg-white p-5 mb-10 rounded-xl shadow-sm border border-gray-100">
                <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Admitted Students</div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1f2d3d] text-white">
                                <th className="p-3 text-left text-sm font-semibold">Name</th>
                                <th className="p-3 text-left text-sm font-semibold">Grade</th>
                                <th className="p-3 text-left text-sm font-semibold">Admitted On</th>
                                <th className="p-3 text-left text-sm font-semibold">Status</th>
                                <th className="p-3 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admittedStudents.length > 0 ? admittedStudents.map((u) => (
                                <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-600">{u.name}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.grade}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.admittedAt ? new Date(u.admittedAt).toLocaleDateString() : "-"}</td>
                                    <td className="p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500 text-white">Admitted</span></td>
                                    <td className="p-3">
                                        <button onClick={() => deleteStudent(u._id)} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="p-3 text-center text-gray-500">No admitted students</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ==================== OLD ==================== */}
            <div className="bg-white p-5 mb-10 rounded-xl shadow-sm border border-gray-100">
                <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Old Students</div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#1f2d3d] text-white">
                                <th className="p-3 text-left text-sm font-semibold">Name</th>
                                <th className="p-3 text-left text-sm font-semibold">Grade</th>
                                <th className="p-3 text-left text-sm font-semibold">Admitted On</th>
                                <th className="p-3 text-left text-sm font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oldStudents.length > 0 ? oldStudents.map((u) => (
                                <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-600">{u.name}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.grade}</td>
                                    <td className="p-3 text-sm text-gray-600">{u.admittedAt ? new Date(u.admittedAt).toLocaleDateString() : "-"}</td>
                                    <td className="p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">Old</span></td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="p-3 text-center text-gray-500">No old students</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
