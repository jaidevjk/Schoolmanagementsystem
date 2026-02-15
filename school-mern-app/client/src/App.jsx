import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PublicLayout from './components/PublicLayout';
import Login from './pages/Login';
import Layout from './components/Layout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Academics from './pages/public/Academics';
import Admission from './pages/public/Admission';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import Students from './pages/admin/Students';
import Teachers from './pages/admin/Teachers';
import Classes from './pages/admin/Classes';
import Subjects from './pages/admin/Subjects';
import AttendancePage from './pages/admin/AttendancePage';
import MarksPage from './pages/admin/MarksPage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherMarks from './pages/teacher/TeacherMarks';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentMarks from './pages/student/StudentMarks';
import RoleDashboard from './components/RoleDashboard';

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="academics" element={<Academics />} />
        <Route path="admission" element={<Admission />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<ProtectedRoute roles={['admin', 'teacher', 'student']}><RoleDashboard /></ProtectedRoute>} />
        <Route path="admin/students" element={<ProtectedRoute roles={['admin']}><Students /></ProtectedRoute>} />
        <Route path="admin/teachers" element={<ProtectedRoute roles={['admin']}><Teachers /></ProtectedRoute>} />
        <Route path="admin/classes" element={<ProtectedRoute roles={['admin']}><Classes /></ProtectedRoute>} />
        <Route path="admin/subjects" element={<ProtectedRoute roles={['admin']}><Subjects /></ProtectedRoute>} />
        <Route path="admin/attendance" element={<ProtectedRoute roles={['admin', 'teacher']}><AttendancePage /></ProtectedRoute>} />
        <Route path="admin/marks" element={<ProtectedRoute roles={['admin', 'teacher']}><MarksPage /></ProtectedRoute>} />
        <Route path="teacher/attendance" element={<ProtectedRoute roles={['teacher']}><TeacherAttendance /></ProtectedRoute>} />
        <Route path="teacher/marks" element={<ProtectedRoute roles={['teacher']}><TeacherMarks /></ProtectedRoute>} />
        <Route path="student/attendance" element={<ProtectedRoute roles={['student']}><StudentAttendance /></ProtectedRoute>} />
        <Route path="student/marks" element={<ProtectedRoute roles={['student']}><StudentMarks /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
