import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/students')
      .then((res) => setStudents(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Manage Students</h3>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.rollNumber}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.classId?.name || '-'} {s.section}</td>
                <td><span className={`badge badge-${s.status === 'active' ? 'success' : 'warning'}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
