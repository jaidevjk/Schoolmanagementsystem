import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="loading">Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card">
        <div className="login-brand">
          <span className="logo">VB</span>
          <h1>V Blooms D World School</h1>
          <p>Portal Login — Admin, Teacher & Student</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@school.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="login-hint">
          Demo: admin@school.com / admin123 · teacher1@school.com / teacher123 · student1@school.com / student123
        </p>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e0e0e0' }}>
          {/* <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Don't have an account?</p>
          <a
            href="/register"
            className="btn btn-secondary"
            style={{ width: '100%', textAlign: 'center', marginBottom: '0.75rem', textDecoration: 'none', display: 'block', padding: '0.75rem' }}
          >
            Create New Account
          </a> */}

          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', marginTop: '1rem' }}>Forgot your password?</p>
          <a
            href="/password-reset"
            className="btn"
            style={{ width: '100%', textAlign: 'center', textDecoration: 'none', display: 'block', padding: '0.75rem', backgroundColor: '#17a2b8', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reset Password
          </a>
        </div>
      </div>
    </div>
  );
}
