import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/classes')
      .then((res) => setClasses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Assign Classes</h3>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Section</th>
              <th>Academic Year</th>
              <th>Class Teacher</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.section}</td>
                <td>{c.academicYear}</td>
                <td>{c.classTeacherId?.name || '-'}</td>
                <td>{c.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
