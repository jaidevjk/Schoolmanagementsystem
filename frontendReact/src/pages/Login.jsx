import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        if (!email || !password) {
            setError('Fill all fields');
            return;
        }

        try {
            const res = await fetch("http://localhost:4003/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("role", data.user.role);
                localStorage.setItem("name", data.user.name);

                const role = data.user.role.toLowerCase();
                if (role === "admin") navigate("/admin-dashboard");
                else if (role === "teacher") navigate("/teacher-dashboard");
                else navigate("/student-dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("Server error. Is backend running?");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="login-body flex-grow">
                <div className="login-container">
                    <div className="login-left">
                        <h1>Login</h1>
                        <p>Enter your account details</p>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="login-btn" onClick={handleLogin}>Login</button>
                        <div className="error-msg">{error}</div>
                    </div>

                    <div className="login-right">
                        <h1>Welcome to<br />Student Portal</h1>
                        <p>Login to access your account</p>
                        <img
                            className="illustration"
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="Illustration"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
