import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleLabel = { admin: 'School Administrator', teacher: 'Teacher', student: 'Student' };

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || '';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="logo"><i className="fa-solid fa-school" /></span>
          <span>{role === 'admin' ? 'Admin' : role === 'teacher' ? 'Teacher' : 'Student'}</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <i className="fa-solid fa-gauge" /> Dashboard
          </NavLink>
          {role === 'admin' && (
            <>
              <NavLink to="/dashboard/admin/students" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-user-graduate" /> Students
              </NavLink>
              <NavLink to="/dashboard/admin/teachers" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-chalkboard-user" /> Teachers
              </NavLink>
              <NavLink to="/dashboard/admin/classes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-door-open" /> Classes
              </NavLink>
              <NavLink to="/dashboard/admin/subjects" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-book" /> Subjects
              </NavLink>
              <NavLink to="/dashboard/admin/attendance" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-calendar-check" /> Attendance
              </NavLink>
              <NavLink to="/dashboard/admin/marks" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-file-pen" /> Marks
              </NavLink>
            </>
          )}
          {role === 'teacher' && (
            <>
              <NavLink to="/dashboard/teacher/attendance" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-calendar-check" /> Attendance
              </NavLink>
              <NavLink to="/dashboard/teacher/marks" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-chart-column" /> Grades
              </NavLink>
            </>
          )}
          {role === 'student' && (
            <>
              <NavLink to="/dashboard/student/attendance" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-calendar-check" /> Attendance
              </NavLink>
              <NavLink to="/dashboard/student/marks" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <i className="fa-solid fa-chart-line" /> Grades
              </NavLink>
            </>
          )}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <strong>{user?.name}</strong>
            <span className="badge badge-info">{role}</span>
          </div>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" /> Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <div className="dash-header">
          <h2>Welcome, {user?.name?.split(' ')[0] || user?.name}!</h2>
          <div className="dash-profile">
            <i className="fa-solid fa-user-circle" />
            <div>
              <strong>{user?.name}</strong>
              <small>{roleLabel[role] || role}</small>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
