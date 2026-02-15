import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AttendancePage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/attendance')
      .then((res) => setList(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Attendance Control</h3>
      <p>View teacher and student attendance reports below.</p>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Class</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.slice(0, 50).map((a) => (
              <tr key={a._id}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td>{a.studentId?.name}</td>
                <td>{a.classId?.name}</td>
                <td><span className={`badge badge-${a.status === 'present' ? 'success' : a.status === 'absent' ? 'danger' : 'warning'}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {list.length > 50 && <p style={{ marginTop: 10, color: '#7f8c8d' }}>Showing first 50 records.</p>}
    </div>
  );
}
