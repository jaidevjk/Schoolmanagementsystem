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
        role: 'Teacher'
    });

    useEffect(() => {
        loadData();
        loadTeachers();
    }, []);

    const logout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/login');
        }
    };

    /* ================= USERS ================= */

    const loadData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:4003/users", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const result = await res.json();
            const data = Array.isArray(result) ? result :
                Array.isArray(result.data) ? result.data : [];

            setUsers(data);
        } catch (error) {
            console.error("Error loading users:", error);
            setUsers([]);
        }
    };

    /* ================= TEACHERS ================= */

    const loadTeachers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:4003/admin/teachers", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const result = await res.json();
            const data = Array.isArray(result) ? result :
                Array.isArray(result.data) ? result.data : [];

            setTeachers(data);
        } catch (error) {
            console.error("Teachers not loading", error);
            setTeachers([]);
        }
    };

    const openTeacherModal = (teacher = null) => {
        if (teacher) {
            setEditingTeacher(teacher);
            setTeacherForm({
                name: teacher.name,
                email: teacher.email,
                password: '',
                subject: teacher.subject || '',
                role: 'Teacher'
            });
        } else {
            setEditingTeacher(null);
            setTeacherForm({
                name: '',
                email: '',
                password: '',
                subject: '',
                role: 'Teacher'
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
            role: 'Teacher'
        });
    };

    const handleTeacherFormChange = (e) => {
        setTeacherForm({ ...teacherForm, [e.target.name]: e.target.value });
    };

    /* ================= CREATE ================= */

    const createTeacher = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:4003/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(teacherForm)
            });

            const data = await res.json();

            if (res.ok) {
                alert("Teacher created successfully");

                // 🔥 instant UI update
                setTeachers(prev => [...prev, data]);

                closeTeacherModal();
            } else {
                alert(data.message || "Error creating teacher");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating teacher");
        }
    };

    /* ================= UPDATE ================= */

    const updateTeacher = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const updateData = { ...teacherForm };
            if (!updateData.password) delete updateData.password;

            const res = await fetch(
                `http://localhost:4003/admin/teachers/${editingTeacher._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(updateData)
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert("Teacher updated successfully");

                setTeachers(prev =>
                    prev.map(t =>
                        t._id === editingTeacher._id ? data : t
                    )
                );

                closeTeacherModal();
            } else {
                alert(data.message || "Error updating teacher");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating teacher");
        }
    };

    /* ================= DELETE ================= */

    const deleteTeacher = async (id) => {
        if (!window.confirm("Delete this teacher?")) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `http://localhost:4003/admin/teachers/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (res.ok) {
                setTeachers(prev => prev.filter(t => t._id !== id));
                alert("Teacher deleted successfully");
            } else {
                alert("Error deleting teacher");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting teacher");
        }
    };

    /* ================= FILTERED STUDENTS ================= */

    const pendingStudents = users.filter(
        u => u.AdmissionStatus === "Pending" && !u.isOldStudent
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex-grow bg-[#eef2f7] p-8">
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                {/* ================= TEACHERS ================= */}
                <div className="bg-white p-5 mb-10 rounded shadow">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-bold">Teachers</h2>
                        <button
                            onClick={() => openTeacherModal()}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            + Add Teacher
                        </button>
                    </div>

                    <table className="w-full border">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-2">Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length > 0 ? (
                                teachers.map(t => (
                                    <tr key={t._id} className="border">
                                        <td className="p-2">{t.name}</td>
                                        <td>{t.email}</td>
                                        <td>{t.subject || "-"}</td>
                                        <td className="space-x-2">
                                            <button
                                                onClick={() => openTeacherModal(t)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteTeacher(t._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-3">
                                        No teachers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ================= PENDING STUDENTS ================= */}
                <div className="bg-white p-5 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Pending Students</h2>

                    <table className="w-full border">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-2">Name</th>
                                <th>Email</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingStudents.length > 0 ? (
                                pendingStudents.map(u => (
                                    <tr key={u._id} className="border">
                                        <td className="p-2">{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.grade}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center p-3">
                                        No pending students
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {showTeacherModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-bold mb-4">
                            {editingTeacher ? "Edit Teacher" : "Add Teacher"}
                        </h2>

                        <form
                            onSubmit={editingTeacher ? updateTeacher : createTeacher}
                            className="space-y-3"
                        >
                            <input
                                type="text"
                                name="name"
                                value={teacherForm.name}
                                onChange={handleTeacherFormChange}
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                value={teacherForm.email}
                                onChange={handleTeacherFormChange}
                                placeholder="Email"
                                className="w-full border p-2 rounded"
                                required
                            />

                            {!editingTeacher && (
                                <input
                                    type="password"
                                    name="password"
                                    value={teacherForm.password}
                                    onChange={handleTeacherFormChange}
                                    placeholder="Password"
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            )}

                            <input
                                type="text"
                                name="subject"
                                value={teacherForm.subject}
                                onChange={handleTeacherFormChange}
                                placeholder="Subject"
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white py-2 rounded"
                                >
                                    {editingTeacher ? "Update" : "Create"}
                                </button>

                                <button
                                    type="button"
                                    onClick={closeTeacherModal}
                                    className="flex-1 bg-gray-400 text-white py-2 rounded"
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
