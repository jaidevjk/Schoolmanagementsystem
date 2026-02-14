import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [marksData, setMarksData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (role !== "student" && role !== "Student") {
            navigate('/login');
            return;
        }

        loadMarks(token);
    }, [navigate]);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const loadMarks = async (token) => {
        try {
            const res = await fetch("http://localhost:5000/api/student/my-marks", {
                headers: { "Authorization": "Bearer " + token }
            });
            const data = await res.json();
            // Ensure data is array
            setMarksData(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading marks:", error);
        }
    };

    return (
        <div className="bg-[#f0fff4] min-h-screen font-sans">
            <div className="bg-[#20c997] text-white p-4 flex justify-between items-center shadow-md">
                <h2 className="text-xl font-bold">Student Dashboard</h2>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">Logout</button>
            </div>

            <div className="p-8">
                <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">My Marks</h3>

                    <div className="space-y-3">
                        {marksData.length > 0 ? marksData.map((item, idx) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-100 flex justify-between items-center">
                                <span className="font-semibold text-gray-700">{item.subject}</span>
                                <div className="text-sm">
                                    <span className="font-bold text-blue-600">{item.marks} marks</span>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <span className="text-green-600">{item.attendance}% attendance</span>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 text-center">No marks available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
