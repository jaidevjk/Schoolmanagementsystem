import React, { useState, useEffect } from 'react';

const Attendance = () => {
    const API_URL = "http://localhost:5000/api/attendance";
    const STUDENT_API = "http://localhost:5000/api/students";

    const [attendanceList, setAttendanceList] = useState([]);
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ studentId: '', date: '', status: 'present' });

    useEffect(() => {
        loadStudents();
        loadAttendance();
    }, []);

    const loadStudents = async () => {
        try {
            const res = await fetch(STUDENT_API);
            const data = await res.json();
            setStudents(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
    };

    const loadAttendance = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setAttendanceList(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        alert("Attendance added!");
        loadAttendance();
        setForm({ ...form, studentId: '' }); // keep date/status
    };

    const handleDelete = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadAttendance();
    };

    return (
        <div className="font-sans p-6 bg-[#f0f4f8] min-h-screen">
            <h1 className="text-2xl text-center text-[#2c3e50] mb-6">Attendance Management</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-8 flex flex-wrap gap-4 justify-center items-end">
                <div className="flex flex-col">
                    <label className="text-sm mb-1">Student</label>
                    <select
                        className="p-2 border rounded"
                        value={form.studentId}
                        onChange={e => setForm({ ...form, studentId: e.target.value })}
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map(s => (
                            <option key={s._id} value={s._id}>{s.userId?.name || s.name || s.email}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm mb-1">Date</label>
                    <input
                        className="p-2 border rounded"
                        type="date"
                        value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm mb-1">Status</label>
                    <select
                        className="p-2 border rounded"
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                    </select>
                </div>

                <button type="submit" className="bg-[#2ecc71] mb-0.5 text-white px-4 py-2 rounded hover:bg-green-600">Add</button>
            </form>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 text-center">Student ID</th>
                            <th className="border p-2 text-center">Date</th>
                            <th className="border p-2 text-center">Status</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceList.length > 0 ? attendanceList.map(a => (
                            <tr key={a._id}>
                                <td className="border p-2 text-center">{a.studentId}</td>
                                <td className="border p-2 text-center">{new Date(a.date).toLocaleDateString()}</td>
                                <td className="border p-2 text-center">{a.status}</td>
                                <td className="border p-2 text-center">
                                    <button onClick={() => handleDelete(a._id)} className="bg-[#e74c3c] text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="text-center p-4">No records found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Attendance;
