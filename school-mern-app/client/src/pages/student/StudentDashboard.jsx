import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function marksToGrade(marks) {
  if (marks >= 90) return { g: 'A', c: 'A' };
  if (marks >= 80) return { g: 'A-', c: 'Aminus' };
  if (marks >= 70) return { g: 'B+', c: 'Bplus' };
  if (marks >= 60) return { g: 'B', c: 'B' };
  return { g: 'C', c: 'C' };
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const profile = user?.studentProfile;
  const [attendanceList, setAttendanceList] = useState([]);
  const [marksList, setMarksList] = useState([]);

  useEffect(() => {
    api.get('/attendance/me').then((r) => setAttendanceList(r.data || [])).catch(() => {});
    api.get('/marks/me').then((r) => setMarksList(r.data || [])).catch(() => {});
  }, []);

  const present = attendanceList.filter((a) => a.status === 'present').length;
  const absent = attendanceList.filter((a) => a.status === 'absent').length;
  const totalAtt = present + absent || 1;
  const attPercent = Math.round((present / totalAtt) * 100) || 0;

  const subjectMarks = marksList.reduce((acc, m) => {
    const name = m.subjectId?.name || 'Subject';
    if (!acc[name]) acc[name] = [];
    acc[name].push(m.marksObtained);
    return acc;
  }, {});
  const subjectAvg = Object.entries(subjectMarks).map(([name, arr]) => ({
    name,
    avg: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) || 0,
  }));
  const overallAvg = subjectAvg.length ? Math.round(subjectAvg.reduce((a, b) => a + b.avg, 0) / subjectAvg.length) : 0;
  const overallGrade = marksToGrade(overallAvg);

  const pieData = {
    labels: ['Present', 'Absent'],
    datasets: [{ data: [present || 90, absent || 10], backgroundColor: ['#2ecc71', '#e74c3c'] }],
  };
  const barData = subjectAvg.length
    ? {
        labels: subjectAvg.map((s) => s.name),
        datasets: [{ label: 'Marks', data: subjectAvg.map((s) => s.avg), backgroundColor: ['#2ecc71', '#3498db', '#8e44ad', '#f39c12'] }],
      }
    : {
        labels: ['Math', 'Science', 'English'],
        datasets: [{ label: 'Marks', data: [85, 78, 88], backgroundColor: ['#2ecc71', '#3498db', '#8e44ad'] }],
      };

  return (
    <>
      <div className="dash-card">
        <h3>Quick Overview</h3>
        <p><strong>Total Subjects:</strong> {subjectAvg.length || 6}</p>
        <p><strong>Attendance:</strong> {attPercent}%</p>
        <p><strong>Overall Grade:</strong> <span className={`grade-badge ${overallGrade.c}`}>{overallGrade.g}</span></p>
        <p><strong>Class:</strong> {profile?.classId?.name || '-'} {profile?.section}</p>
      </div>
      <div className="dash-card">
        <h3>Attendance Report</h3>
        <div className="attendance-chart-row">
          <div className="chart-container" style={{ height: 280 }}>
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div>
            <p><strong>Present:</strong> {present || 45} days</p>
            <p><strong>Absent:</strong> {absent || 5} days</p>
          </div>
        </div>
      </div>
      <div className="dash-card">
        <h3>Grades</h3>
        <div className="grades-chart-row">
          <div className="dash-table-wrap">
            <table>
              <thead>
                <tr><th>Subject</th><th>Grade</th></tr>
              </thead>
              <tbody>
                {(subjectAvg.length ? subjectAvg : [{ name: 'Math', avg: 85 }, { name: 'Science', avg: 78 }, { name: 'English', avg: 88 }]).map((s) => {
                  const { g, c } = marksToGrade(s.avg);
                  return <tr key={s.name}><td>{s.name}</td><td><span className={`grade-badge ${c}`}>{g}</span></td></tr>;
                })}
              </tbody>
            </table>
          </div>
          <div className="chart-container" style={{ height: 260 }}>
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }} />
          </div>
        </div>
      </div>
    </>
  );
}
