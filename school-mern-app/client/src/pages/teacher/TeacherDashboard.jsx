import { useAuth } from '../../context/AuthContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const profile = user?.teacherProfile;

  return (
    <div className="dash-card">
      <h3>Teacher Dashboard</h3>
      <p>Manage classes, attendance, assignments, grades and messages.</p>
      <div style={{ marginTop: 20 }}>
        <p><strong>Employee ID:</strong> {profile?.employeeId || '-'}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Qualification:</strong> {profile?.qualification || '-'}</p>
        <p><strong>Classes:</strong> {profile?.classIds?.map((c) => c.name).join(', ') || '-'}</p>
      </div>
    </div>
  );
}
