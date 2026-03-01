import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../pages/admin/AdminDashboard';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';

export default function RoleDashboard() {
  const { user } = useAuth();
  if (user?.role === 'admin') return <AdminDashboard />;
  if (user?.role === 'teacher') return <TeacherDashboard />;
  if (user?.role === 'student') return <StudentDashboard />;
  return null;
}
