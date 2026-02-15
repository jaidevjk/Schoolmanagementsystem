import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [marksData, setMarksData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (role?.toLowerCase() !== "student") {
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
            const res = await fetch("http://localhost:4003/users/my-marks", {
                headers: { "Authorization": "Bearer " + token }
            });
            const data = await res.json();
            // Ensure data is array
            if (Array.isArray(data)) {
                setMarksData(data);
            } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
                setMarksData(data.data);
            } else {
                setMarksData([]);
            }
        } catch (error) {
            console.error("Error loading marks:", error);
            setMarksData([]);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow bg-[#f0fff4] font-sans">
                <div className="bg-[#20c997] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold">Student Dashboard</h2>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors w-full md:w-auto">Logout</button>
                </div>

                <div className="p-4 md:p-8">
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md max-w-2xl mx-auto w-full">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">My Marks</h3>

                        <div className="space-y-3">
                            {Array.isArray(marksData) && marksData.length > 0 ? marksData.map((item, idx) => (
                                <div key={idx} className="p-3 md:p-4 bg-gray-50 rounded border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-0">
                                    <span className="font-semibold text-gray-700 text-sm md:text-base">{item.subject}</span>
                                    <div className="text-sm md:text-base flex flex-wrap gap-2">
                                        <span className="font-bold text-blue-600">{item.marks} marks</span>
                                        <span className="mx-2 text-gray-300 hidden md:inline">|</span>
                                        <span className="text-green-600">{item.attendance}% attendance</span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-center text-sm md:text-base">No marks available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
