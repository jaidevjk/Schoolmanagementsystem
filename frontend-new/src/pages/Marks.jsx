import React, { useState, useEffect } from 'react';

const Marks = () => {
    const API_URL = "http://localhost:5000/api/marks";
    const STUDENT_API = "http://localhost:5000/api/students";

    const [marksList, setMarksList] = useState([]);
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ studentId: '', subject: '', marks: '' });

    useEffect(() => {
        loadStudents();
        loadMarks();
    }, []);

    const loadStudents = async () => {
        try {
            const res = await fetch(STUDENT_API);
            const data = await res.json();
            setStudents(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
    };

    const loadMarks = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setMarksList(Array.isArray(data) ? data : []);
        } catch (e) { console.error(e); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        alert("Marks added!");
        loadMarks();
        setForm({ studentId: '', subject: '', marks: '' });
    };

    const handleDelete = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadMarks();
    };

    return (
        <div className="font-sans p-6 bg-[#f0f4f8] min-h-screen">
            <h1 className="text-2xl text-center text-[#2c3e50] mb-6">Marks Management</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
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
                <input
                    className="p-2 border rounded"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    required
                />
                <input
                    className="p-2 border rounded"
                    type="number"
                    placeholder="Marks"
                    value={form.marks}
                    onChange={e => setForm({ ...form, marks: e.target.value })}
                    required
                />
                <button type="submit" className="bg-[#2ecc71] text-white px-4 py-2 rounded hover:bg-green-600">Add Marks</button>
            </form>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 text-center">Student ID</th>
                            <th className="border p-2 text-center">Subject</th>
                            <th className="border p-2 text-center">Marks</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marksList.length > 0 ? marksList.map(m => (
                            <tr key={m._id}>
                                <td className="border p-2 text-center">{m.studentId}</td>
                                <td className="border p-2 text-center">{m.subject}</td>
                                <td className="border p-2 text-center">{m.marks}</td>
                                <td className="border p-2 text-center">
                                    <button onClick={() => handleDelete(m._id)} className="bg-[#e74c3c] text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
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
export default Marks;
