import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function MarksPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/marks')
      .then((res) => setList(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-card">
      <h3>Exam / Marks Management</h3>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Exam</th>
              <th>Marks</th>
              <th>Academic Year</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m._id}>
                <td>{m.studentId?.name}</td>
                <td>{m.subjectId?.name}</td>
                <td>{m.examName || m.examType}</td>
                <td>{m.marksObtained} / {m.maxMarks}</td>
                <td>{m.academicYear || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
