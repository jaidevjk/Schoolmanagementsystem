import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [showTeacherModal, setShowTeacherModal] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [teacherForm, setTeacherForm] = useState({
        name: '',
        email: '',
        password: '',
        subject: '',
        role: 'teacher'
    });

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
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:4003/users", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await res.json();
            let data = [];
            if (Array.isArray(result)) {
                data = result;
            } else if (Array.isArray(result.data)) {
                data = result.data;
            } else if (result && typeof result === 'object') {
                data = [result];
            }
            setUsers(Array.isArray(data) ? data : []);
            loadTeachers();
        } catch (error) {
            console.error("Error loading users:", error);
            setUsers([]);
        }
    };

    const loadTeachers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:4003/admin/teachers", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await res.json();
            let data = [];
            if (Array.isArray(result)) {
                data = result;
            } else if (Array.isArray(result.data)) {
                data = result.data;
            } else if (result && typeof result === 'object') {
                data = [result];
            }
            setTeachers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Teachers not loading", error);
            setTeachers([]);
        }
    };

    // ========== TEACHER CRUD ==========
    const openTeacherModal = (teacher = null) => {
        if (teacher) {
            setEditingTeacher(teacher);
            setTeacherForm({
                name: teacher.name,
                email: teacher.email,
                password: '',
                subject: teacher.subject || '',
                role: teacher.role || 'teacher'
            });
        } else {
            setEditingTeacher(null);
            setTeacherForm({
                name: '',
                email: '',
                password: '',
                subject: '',
                role: 'teacher'
            });
        }
        setShowTeacherModal(true);
    };

    const closeTeacherModal = () => {
        setShowTeacherModal(false);
        setEditingTeacher(null);
        setTeacherForm({
            name: '',
            email: '',
            password: '',
            subject: '',
            role: 'teacher'
        });
    };

    const handleTeacherFormChange = (e) => {
        setTeacherForm({ ...teacherForm, [e.target.name]: e.target.value });
    };

    const createTeacher = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:4003/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(teacherForm)
            });
            if (res.ok) {
                alert("Teacher created successfully");
                closeTeacherModal();
                loadTeachers();
            } else {
                const error = await res.json();
                alert("Error: " + error.message || error);
            }
        } catch (error) {
            console.error("Error creating teacher:", error);
            alert("Error creating teacher");
        }
    };

    const updateTeacher = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const updateData = { ...teacherForm };
            if (!updateData.password) delete updateData.password;

            const res = await fetch(`http://localhost:4003/admin/teachers/${editingTeacher._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });
            if (res.ok) {
                alert("Teacher updated successfully");
                closeTeacherModal();
                loadTeachers();
            } else {
                const error = await res.json();
                alert("Error: " + error.message || error);
            }
        } catch (error) {
            console.error("Error updating teacher:", error);
            alert("Error updating teacher");
        }
    };

    const deleteTeacher = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete teacher ${name}?`)) {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`http://localhost:4003/admin/teachers/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    alert("Teacher deleted successfully");
                    loadTeachers();
                } else {
                    alert("Error deleting teacher");
                }
            } catch (error) {
                console.error("Error deleting teacher:", error);
                alert("Error deleting teacher");
            }
        }
    };

    // ========== STUDENT ACTIONS ==========
    const approveStudent = async (id) => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:4003/users/approve/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        loadData();
    };

    const admitStudent = async (id) => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:4003/users/admit/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        loadData();
    };

    const markOld = async (id) => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:4003/users/mark-old/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        loadData();
    };

    const deleteStudent = async (id) => {
        if (window.confirm("Delete this student?")) {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:4003/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            loadData();
        }
    };

    // Filtered Lists
    const pendingStudents = Array.isArray(users) ? users.filter(u => u.AdmissionStatus === "Pending" && !u.isOldStudent) : [];
    const approvedStudents = Array.isArray(users) ? users.filter(u => u.AdmissionStatus === "Yet to be Admitted" && !u.isOldStudent) : [];
    const admittedStudents = Array.isArray(users) ? users.filter(u => u.AdmissionStatus === "Admitted" && !u.isOldStudent) : [];
    const oldStudents = Array.isArray(users) ? users.filter(u => u.isOldStudent) : [];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow bg-[#eef2f7] p-4 md:p-8 font-sans">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors w-full md:w-auto"
                    >
                        Logout
                    </button>
                </div>

                {/* ==================== TEACHERS ==================== */}
                <div className="bg-white p-4 md:p-5 mb-10 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-2 border-b-2 border-gray-100 gap-4">
                        <div className="text-lg font-bold text-gray-700">Teachers</div>
                        <button
                            onClick={() => openTeacherModal()}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold whitespace-nowrap"
                        >
                            + Add Teacher
                        </button>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse min-w-max md:min-w-full">
                            <thead>
                                <tr className="bg-[#1f2d3d] text-white text-sm md:text-base">
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Name</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Email</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Subject</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(teachers) && teachers.length > 0 ? teachers.map((t) => (
                                    <tr key={t._id} className="border-b border-gray-100 hover:bg-gray-50 text-sm md:text-base">
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{t.name}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{t.email}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{t.subject || "-"}</td>
                                        <td className="p-2 md:p-3 flex flex-col md:flex-row gap-2">
                                            <button
                                                onClick={() => openTeacherModal(t)}
                                                className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 whitespace-nowrap"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteTeacher(t._id, t.name)}
                                                className="px-2 md:px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="p-3 text-center text-gray-500 text-xs md:text-sm">No teachers found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ==================== PENDING ==================== */}
                <div className="bg-white p-4 md:p-5 mb-10 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Pending Applications</div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse min-w-max md:min-w-full">
                            <thead>
                                <tr className="bg-[#1f2d3d] text-white text-xs md:text-sm">
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Name</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Parent</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Email</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Grade</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Status</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(pendingStudents) && pendingStudents.length > 0 ? pendingStudents.map((u) => (
                                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 text-xs md:text-sm">
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.name}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.parentName}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.email}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.grade}</td>
                                        <td className="p-2 md:p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white">Pending</span></td>
                                        <td className="p-2 md:p-3 flex flex-col md:flex-row gap-1">
                                            <button onClick={() => approveStudent(u._id)} className="px-2 md:px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 whitespace-nowrap">Approve</button>
                                            <button onClick={() => deleteStudent(u._id)} className="px-2 md:px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="6" className="p-3 text-center text-gray-500 text-xs md:text-sm">No pending applications</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ==================== APPROVED ==================== */}
                <div className="bg-white p-4 md:p-5 mb-10 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Approved - Yet to be Admitted</div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse min-w-max md:min-w-full">
                            <thead>
                                <tr className="bg-[#1f2d3d] text-white text-xs md:text-sm">
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Name</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Grade</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Status</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(approvedStudents) && approvedStudents.length > 0 ? approvedStudents.map((u) => (
                                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 text-xs md:text-sm">
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.name}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.grade}</td>
                                        <td className="p-2 md:p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-500 text-white">Approved</span></td>
                                        <td className="p-2 md:p-3 flex flex-col md:flex-row gap-1">
                                            <button onClick={() => admitStudent(u._id)} className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 whitespace-nowrap">Admit</button>
                                            <button onClick={() => markOld(u._id)} className="px-2 md:px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600 whitespace-nowrap">Mark Old</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="p-3 text-center text-gray-500 text-xs md:text-sm">No approved students</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ==================== ADMITTED ==================== */}
                <div className="bg-white p-4 md:p-5 mb-10 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Admitted Students</div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse min-w-max md:min-w-full">
                            <thead>
                                <tr className="bg-[#1f2d3d] text-white text-xs md:text-sm">
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Name</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Grade</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Admitted On</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Status</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(admittedStudents) && admittedStudents.length > 0 ? admittedStudents.map((u) => (
                                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 text-xs md:text-sm">
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.name}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.grade}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.admittedAt ? new Date(u.admittedAt).toLocaleDateString() : "-"}</td>
                                        <td className="p-2 md:p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500 text-white">Admitted</span></td>
                                        <td className="p-2 md:p-3">
                                            <button onClick={() => deleteStudent(u._id)} className="px-2 md:px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="p-3 text-center text-gray-500 text-xs md:text-sm">No admitted students</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ==================== OLD ==================== */}
                <div className="bg-white p-4 md:p-5 mb-10 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <div className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100 text-gray-700">Old Students</div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse min-w-max md:min-w-full">
                            <thead>
                                <tr className="bg-[#1f2d3d] text-white text-xs md:text-sm">
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Name</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Grade</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Admitted On</th>
                                    <th className="p-2 md:p-3 text-left text-xs md:text-sm font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(oldStudents) && oldStudents.length > 0 ? oldStudents.map((u) => (
                                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 text-xs md:text-sm">
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.name}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.grade}</td>
                                        <td className="p-2 md:p-3 text-xs md:text-sm text-gray-600">{u.admittedAt ? new Date(u.admittedAt).toLocaleDateString() : "-"}</td>
                                        <td className="p-2 md:p-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">Old</span></td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="p-3 text-center text-gray-500 text-xs md:text-sm">No old students</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ==================== TEACHER MODAL ==================== */}
            {showTeacherModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
                            {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                        </h2>
                        <form onSubmit={editingTeacher ? updateTeacher : createTeacher} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={teacherForm.name}
                                    onChange={handleTeacherFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Teacher Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={teacherForm.email}
                                    onChange={handleTeacherFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            {!editingTeacher && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={teacherForm.password}
                                        onChange={handleTeacherFormChange}
                                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={teacherForm.subject}
                                    onChange={handleTeacherFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-colors text-sm"
                                >
                                    {editingTeacher ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeTeacherModal}
                                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded font-semibold transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AdminDashboard;
