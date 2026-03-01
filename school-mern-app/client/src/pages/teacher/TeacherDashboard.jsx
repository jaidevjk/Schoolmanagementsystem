import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const profile = user?.teacherProfile;

  const [stats, setStats] = useState({
    classes: 0,
    students: 0,
    pending: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [cRes, sRes, mRes, aRes, subRes] = await Promise.all([
          api.get('/classes'),
          api.get('/students'),
          api.get('/marks'),
          api.get('/attendance'),
          api.get('/subjects')
        ]);

        const cList = Array.isArray(cRes.data) ? cRes.data : (cRes.data.data || []);
        const sList = Array.isArray(sRes.data) ? sRes.data : (sRes.data.data || []);
        const mList = Array.isArray(mRes.data) ? mRes.data : (mRes.data.data || []);
        const aList = Array.isArray(aRes.data) ? aRes.data : (aRes.data.data || []);
        const subList = Array.isArray(subRes.data) ? subRes.data : (subRes.data.data || []);

        setStats({
          classes: cList.length,
          students: sList.length,
          pending: Math.max(0, subList.length - mList.length)
        });

        // Generate activities
        const recentActivities = [];
        if (aList.length > 0) {
          const lastA = aList[0];
          recentActivities.push({
            icon: 'fa-calendar-check',
            text: `Attendance marked for ${lastA.classId?.name || 'Class'}`,
            time: new Date(lastA.date).toLocaleDateString()
          });
        }
        if (mList.length > 0) {
          const lastM = mList[0];
          recentActivities.push({
            icon: 'fa-file-pen',
            text: `Marks entered for ${lastM.studentId?.name || 'Student'} (${lastM.subjectId?.name || 'Subject'})`,
            time: 'Recently'
          });
        }
        setActivities(recentActivities);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-view">
      {/* Profile/Welcome Card */}
      <div className="dash-card">
        <h3>Teacher Dashboard</h3>
        <p style={{ color: '#666', marginBottom: 20 }}>Manage classes, attendance, assignments, grades and messages.</p>
        <div style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, border: '1px solid #eee' }}>
          <p style={{ marginBottom: 10 }}><strong>Employee ID:</strong> {profile?.employeeId || '-'}</p>
          <p style={{ marginBottom: 10 }}><strong>Email:</strong> {user?.email || '-'}</p>
          <p style={{ marginBottom: 10 }}><strong>Qualification:</strong> {profile?.qualification || '-'}</p>
          <p style={{ marginBottom: 0 }}><strong>Classes:</strong> {profile?.classIds?.map((c) => c.name).join(', ') || '-'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-cards" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <div className="stat-card">
          <h3>My Classes</h3>
          <div className="value">{stats.classes}</div>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="value">{stats.students}</div>
        </div>
        <div className="stat-card">
          <h3>Pending Marks</h3>
          <div className="value">{stats.pending}</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dash-card">
        <h3>Recent Activity</h3>
        <div id="recent-activity-list">
          {activities.length > 0 ? (
            activities.map((act, idx) => (
              <div className="activity-item" key={idx}>
                <div className="activity-icon"><i className={`fa-solid ${act.icon}`}></i></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9rem', color: '#2c3e50', margin: 0 }}>{act.text}</p>
                  <small style={{ color: '#7f8c8d', fontSize: '0.75rem' }}>{act.time}</small>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#777', fontSize: '0.9rem' }}>No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
}
