import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentEmail: '',
        subject: '',
        marks: '',
        attendance: ''
    });
    const [students, setStudents] = useState([]);
    const [activeTab, setActiveTab] = useState('students'); // 'students' or 'marks'
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [studentForm, setStudentForm] = useState({
        name: '',
        email: '',
        phonenumber: '',
        parentName: '',
        dob: '',
        gender: '',
        address: '',
        grade: ''
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // Note: The login flow now sets 'token' from the backend response
        if (role?.toLowerCase() !== "teacher") {
            navigate('/login');
        } else {
            loadStudents();
        }
    }, [navigate]);

    const loadStudents = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:4003/users", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await res.json();

            // Handle different response formats
            let data = [];
            if (Array.isArray(result)) {
                data = result;
            } else if (Array.isArray(result.data)) {
                data = result.data;
            } else if (result && typeof result === 'object') {
                data = [result];
            }
            setStudents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading students:", error);
            setStudents([]);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const addMarks = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:4003/marks/add-marks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("Marks Saved Successfully");
                setFormData({ studentEmail: '', subject: '', marks: '', attendance: '' });
            } else {
                alert("Error saving marks");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving marks");
        }
    };

    // ========== STUDENT CRUD ==========
    const openStudentModal = (student = null) => {
        if (student) {
            setEditingStudent(student);
            setStudentForm({
                name: student.name || '',
                email: student.email || '',
                phonenumber: student.phonenumber || '',
                parentName: student.parentName || '',
                dob: student.dob ? student.dob.split('T')[0] : '',
                gender: student.gender || '',
                address: student.address || '',
                grade: student.grade || ''
            });
        } else {
            setEditingStudent(null);
            setStudentForm({
                name: '',
                email: '',
                phonenumber: '',
                parentName: '',
                dob: '',
                gender: '',
                address: '',
                grade: ''
            });
        }
        setShowStudentModal(true);
    };

    const closeStudentModal = () => {
        setShowStudentModal(false);
        setEditingStudent(null);
        setStudentForm({
            name: '',
            email: '',
            phonenumber: '',
            parentName: '',
            dob: '',
            gender: '',
            address: '',
            grade: ''
        });
    };

    const handleStudentFormChange = (e) => {
        setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
    };

    const createStudent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:4003/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(studentForm)
            });
            if (res.ok) {
                alert("Student created successfully");
                closeStudentModal();
                loadStudents();
            } else {
                const error = await res.json();
                alert("Error: " + (error.message || error));
            }
        } catch (error) {
            console.error("Error creating student:", error);
            alert("Error creating student");
        }
    };

    const updateStudent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:4003/users/${editingStudent._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(studentForm)
            });
            if (res.ok) {
                alert("Student updated successfully");
                closeStudentModal();
                loadStudents();
            } else {
                const error = await res.json();
                alert("Error: " + (error.message || error));
            }
        } catch (error) {
            console.error("Error updating student:", error);
            alert("Error updating student");
        }
    };

    const deleteStudent = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete student ${name}?`)) {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`http://localhost:4003/users/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    alert("Student deleted successfully");
                    loadStudents();
                } else {
                    alert("Error deleting student");
                }
            } catch (error) {
                console.error("Error deleting student:", error);
                alert("Error deleting student");
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow bg-[#eef2ff] font-sans">
                <div className="bg-[#4c6ef5] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold">Teacher Dashboard</h2>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors w-full md:w-auto">Logout</button>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white border-b border-gray-200 p-0">
                    <div className="flex gap-0 max-w-4xl mx-auto">
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`px-6 py-3 font-semibold text-sm md:text-base transition-colors ${activeTab === 'students'
                                ? 'text-[#4c6ef5] border-b-2 border-[#4c6ef5]'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            View Students
                        </button>
                        <button
                            onClick={() => setActiveTab('marks')}
                            className={`px-6 py-3 font-semibold text-sm md:text-base transition-colors ${activeTab === 'marks'
                                ? 'text-[#4c6ef5] border-b-2 border-[#4c6ef5]'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Add Marks
                        </button>
                    </div>
                </div>

                <div className="p-4 md:p-8">
                    {/* Students List Tab */}
                    {activeTab === 'students' && (
                        <div className="bg-white rounded-xl shadow-md overflow-auto">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg font-semibold text-gray-800">Students List</h3>
                                <button
                                    onClick={() => openStudentModal()}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold whitespace-nowrap"
                                >
                                    + Add Student
                                </button>
                            </div>
                            <div className="min-w-full">
                                {students && students.length > 0 ? (
                                    <table className="w-full text-sm md:text-base">
                                        <thead className="bg-[#4c6ef5] text-white sticky top-0">
                                            <tr>
                                                <th className="p-3 text-left">Name</th>
                                                <th className="p-3 text-left">Email</th>
                                                <th className="p-3 text-left">Grade</th>
                                                <th className="p-3 text-left">Parent Name</th>
                                                <th className="p-3 text-left">Phone</th>
                                                <th className="p-3 text-left">Status</th>
                                                <th className="p-3 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((student) => (
                                                <tr key={student._id} className="border-b border-gray-200 hover:bg-blue-50">
                                                    <td className="p-3">{student.name || 'N/A'}</td>
                                                    <td className="p-3">{student.email || 'N/A'}</td>
                                                    <td className="p-3">{student.grade || 'N/A'}</td>
                                                    <td className="p-3">{student.parentName || 'N/A'}</td>
                                                    <td className="p-3">{student.phonenumber || 'N/A'}</td>
                                                    <td className="p-3">
                                                        <span className={`px-3 py-1 rounded text-white text-xs font-semibold ${student.AdmissionStatus === 'Admitted' ? 'bg-green-500' :
                                                                student.AdmissionStatus === 'Pending' ? 'bg-yellow-500' :
                                                                    'bg-gray-500'
                                                            }`}>
                                                            {student.AdmissionStatus || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 flex flex-col md:flex-row gap-2">
                                                        <button
                                                            onClick={() => openStudentModal(student)}
                                                            className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 whitespace-nowrap"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => deleteStudent(student._id, student.name)}
                                                            className="px-2 md:px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-8 text-center text-gray-600">No students found</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Add Marks Tab */}
                    {activeTab === 'marks' && (
                        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md max-w-lg mx-auto w-full">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Add / Update Marks</h3>

                            <form onSubmit={addMarks} className="space-y-4">
                                <input
                                    id="studentEmail"
                                    placeholder="Student Email"
                                    className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none text-sm md:text-base"
                                    value={formData.studentEmail}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    id="subject"
                                    placeholder="Subject"
                                    className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none text-sm md:text-base"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    id="marks"
                                    placeholder="Marks"
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none text-sm md:text-base"
                                    value={formData.marks}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    id="attendance"
                                    placeholder="Attendance %"
                                    type="number"
                                    className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none text-sm md:text-base"
                                    value={formData.attendance}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#4c6ef5] hover:bg-[#3b5bdb] text-white py-3 rounded font-semibold transition-colors text-sm md:text-base"
                                >
                                    Submit Marks
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer />

            {/* ==================== STUDENT MODAL ==================== */}
            {showStudentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md my-8">
                        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-800">
                            {editingStudent ? 'Edit Student' : 'Add New Student'}
                        </h2>
                        <form onSubmit={editingStudent ? updateStudent : createStudent} className="space-y-3 max-h-[70vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={studentForm.name}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Student Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={studentForm.email}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phonenumber"
                                    value={studentForm.phonenumber}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Phone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Parent Name</label>
                                <input
                                    type="text"
                                    name="parentName"
                                    value={studentForm.parentName}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Parent Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={studentForm.dob}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={studentForm.gender}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                                <textarea
                                    name="address"
                                    value={studentForm.address}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Address"
                                    rows="2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Grade</label>
                                <input
                                    type="text"
                                    name="grade"
                                    value={studentForm.grade}
                                    onChange={handleStudentFormChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm"
                                    placeholder="Grade/Class"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-colors text-sm"
                                >
                                    {editingStudent ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeStudentModal}
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

export default TeacherDashboard;
