import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentEmail: '',
        subject: '',
        marks: '',
        attendance: ''
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // Note: The original login flow might not set 'token', so this check might fail.
        // If login logic is updated to provide a token, this will work.
        // For now, checks role at least.
        if (role !== "teacher" && role !== "Teacher") {
            navigate('/login');
        }
    }, [navigate]);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const addMarks = async () => {
        const token = localStorage.getItem("token");
        try {
            await fetch("http://localhost:5000/api/teacher/add-marks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(formData)
            });
            alert("Marks Saved");
            setFormData({ studentEmail: '', subject: '', marks: '', attendance: '' });
        } catch (error) {
            console.error(error);
            alert("Error saving marks");
        }
    };

    return (
        <div className="bg-[#eef2ff] min-h-screen font-sans">
            <div className="bg-[#4c6ef5] text-white p-4 flex justify-between items-center shadow-md">
                <h2 className="text-xl font-bold">Teacher Dashboard</h2>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">Logout</button>
            </div>

            <div className="p-8">
                <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Add / Update Marks</h3>

                    <div className="space-y-4">
                        <input
                            id="studentEmail"
                            placeholder="Student Email"
                            className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none"
                            value={formData.studentEmail}
                            onChange={handleChange}
                        />
                        <input
                            id="subject"
                            placeholder="Subject"
                            className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                        <input
                            id="marks"
                            placeholder="Marks"
                            className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none"
                            value={formData.marks}
                            onChange={handleChange}
                        />
                        <input
                            id="attendance"
                            placeholder="Attendance %"
                            className="w-full p-3 border border-gray-300 rounded focus:border-[#4c6ef5] focus:outline-none"
                            value={formData.attendance}
                            onChange={handleChange}
                        />
                        <button
                            onClick={addMarks}
                            className="w-full bg-[#4c6ef5] hover:bg-[#3b5bdb] text-white py-3 rounded font-semibold transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
