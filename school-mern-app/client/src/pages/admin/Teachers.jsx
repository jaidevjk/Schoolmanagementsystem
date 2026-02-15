import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/teachers')
      .then((res) => setTeachers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Manage Teachers</h3>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t._id}>
                <td>{t.employeeId}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.qualification || '-'}</td>
                <td><span className={`badge badge-${t.status === 'active' ? 'success' : 'warning'}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
