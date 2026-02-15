import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const register = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            alert(data.message || data.error);
            if (res.ok) {
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-0">
            <div className="bg-white p-6 md:p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                <input
                    id="name"
                    placeholder="Name"
                    className="w-full p-2 mb-3 border rounded text-sm md:text-base"
                    value={formData.name} onChange={handleChange}
                />
                <input
                    id="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 border rounded text-sm md:text-base"
                    value={formData.email} onChange={handleChange}
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3 border rounded text-sm md:text-base"
                    value={formData.password} onChange={handleChange}
                />

                <select
                    id="role"
                    className="w-full p-2 mb-4 border rounded bg-white text-sm md:text-base"
                    value={formData.role} onChange={handleChange}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    onClick={register}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors text-sm md:text-base"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
