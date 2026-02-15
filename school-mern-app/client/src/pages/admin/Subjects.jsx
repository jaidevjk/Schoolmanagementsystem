import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subjects')
      .then((res) => setSubjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Subjects</h3>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Max Marks</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s._id}>
                <td>{s.code}</td>
                <td>{s.name}</td>
                <td>{s.maxMarks}</td>
                <td>{s.teacherId?.name || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
