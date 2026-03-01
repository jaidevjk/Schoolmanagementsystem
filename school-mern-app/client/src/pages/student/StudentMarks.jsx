import { useState, useEffect } from 'react';
import api from '../../api/axios';

function marksToGrade(marks) {
  if (marks >= 90) return { g: 'A', c: 'A' };
  if (marks >= 80) return { g: 'A-', c: 'Aminus' };
  if (marks >= 70) return { g: 'B+', c: 'Bplus' };
  if (marks >= 60) return { g: 'B', c: 'B' };
  return { g: 'C', c: 'C' };
}

export default function StudentMarks() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/marks/me')
      .then((res) => setList(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Grades</h3>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Exam</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Academic Year</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => {
              const pct = m.maxMarks ? Math.round((m.marksObtained / m.maxMarks) * 100) : 0;
              const { g, c } = marksToGrade(pct);
              return (
                <tr key={m._id}>
                  <td>{m.subjectId?.name}</td>
                  <td>{m.examName || m.examType}</td>
                  <td>{m.marksObtained} / {m.maxMarks}</td>
                  <td><span className={`grade-badge ${c}`}>{g}</span></td>
                  <td>{m.academicYear || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
