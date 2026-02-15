import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function StudentAttendance() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/attendance/me')
      .then((res) => setList(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Attendance Report</h3>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Class</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a._id}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td>{a.classId?.name}</td>
                <td><span className={`badge badge-${a.status === 'present' ? 'success' : a.status === 'absent' ? 'danger' : 'warning'}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
