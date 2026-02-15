import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../../api/axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const attendanceChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: false },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0 });
  const [attendanceData, setAttendanceData] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, t, c, a, e] = await Promise.all([
        api.get('/students'),
        api.get('/teachers'),
        api.get('/classes'),
        api.get('/attendance').catch(() => ({ data: [] })),
        api.get('/enquiry').catch(() => ({ data: [] })),
      ]);

      setStats({ students: s.data.length, teachers: t.data.length, classes: c.data.length });

      const list = a.data || [];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const present = days.map((_, i) => list.filter(x => x.status === 'present' && new Date(x.date).getDay() === (i + 1)).length);
      const absent = days.map((_, i) => list.filter(x => x.status === 'absent' && new Date(x.date).getDay() === (i + 1)).length);

      if (present.some(Boolean) || absent.some(Boolean)) {
        setAttendanceData({ labels: days, present, absent });
      } else {
        setAttendanceData({ labels: days, present: [30, 28, 35, 32, 31], absent: [5, 7, 3, 6, 4] });
      }

      setEnquiries(Array.isArray(e.data) ? e.data : []);
    } catch (error) {
      console.error('Error loading data:', error);
      setAttendanceData({ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], present: [30, 28, 35, 32, 31], absent: [5, 7, 3, 6, 4] });
    }
    setLoading(false);
  };

  const approveEnquiry = async (id) => {
    try {
      await api.put(`/enquiry/${id}`, { admissionStatus: 'approved', approved: true });
      loadData();
      alert('Enquiry approved. Status: approved (Yet to be Admitted)');
    } catch (error) {
      console.error('Error approving enquiry:', error);
      alert('Error approving enquiry');
    }
  };

  const admitStudent = async (id) => {
    try {
      await api.put(`/enquiry/${id}`, { admissionStatus: 'admitted' });
      loadData();
      alert('Student admitted successfully!');
    } catch (error) {
      console.error('Error admitting student:', error);
      alert('Error admitting student');
    }
  };

  const markAsOld = async (id) => {
    try {
      await api.put(`/enquiry/${id}`, { admissionStatus: 'old' });
      loadData();
      alert('Student marked as old student');
    } catch (error) {
      console.error('Error marking as old:', error);
      alert('Error marking as old');
    }
  };

  // Filter enquiries by server fields (admissionStatus, approved, isOldStudent)
  const pendingEnquiries = enquiries.filter(e => e.admissionStatus === 'pending');
  const approvedEnquiries = enquiries.filter(e => e.admissionStatus === 'approved');
  // admitted within last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const admittedStudents = enquiries.filter(e => e.admissionStatus === 'admitted' && e.admittedAt && new Date(e.admittedAt) >= sevenDaysAgo);
  const oldStudents = enquiries.filter(e => e.isOldStudent === true || e.admissionStatus === 'old');

  const lineData = attendanceData ? {
    labels: attendanceData.labels,
    datasets: [
      { label: 'Present', data: attendanceData.present, borderColor: '#2ecc71', backgroundColor: 'rgba(46, 204, 113, 0.1)', tension: 0.3 },
      { label: 'Absent', data: attendanceData.absent, borderColor: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.1)', tension: 0.3 },
    ],
  } : null;

  return (
    <>
      <div className="dash-card">
        <h3>School Overview</h3>
        {lineData && (
          <div className="chart-container" style={{ height: 280 }}>
            <Line data={lineData} options={attendanceChartOptions} />
          </div>
        )}
      </div>
      <div className="grid-cards">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="value">{stats.students}</div>
        </div>
        <div className="stat-card">
          <h3>Total Teachers</h3>
          <div className="value">{stats.teachers}</div>
        </div>
        <div className="stat-card">
          <h3>Classes</h3>
          <div className="value">{stats.classes}</div>
        </div>
      </div>

      {/* ================= PENDING APPLICATIONS ================= */}
      <div className="dash-card">
        <h3>Pending Applications</h3>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Parent Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingEnquiries.length > 0 ? (
                pendingEnquiries.map(enquiry => (
                  <tr key={enquiry._id}>
                    <td>{enquiry.name || '-'}</td>
                    <td>{enquiry.parentName || '-'}</td>
                    <td>{enquiry.email || '-'}</td>
                    <td>{enquiry.grade || '-'}</td>
                    <td>{enquiry.phone || '-'}</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                    <td>
                      <button
                        onClick={() => approveEnquiry(enquiry._id)}
                        className="btn btn-sm"
                        style={{ background: '#2ecc71', color: '#fff', marginRight: '5px' }}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '15px' }}>No pending applications</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= APPROVED - YET TO BE ADMITTED ================= */}
      <div className="dash-card">
        <h3>Approved - Yet to be Admitted</h3>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedEnquiries.length > 0 ? (
                approvedEnquiries.map(enquiry => (
                  <tr key={enquiry._id}>
                    <td>{enquiry.name || '-'}</td>
                    <td>{enquiry.email || '-'}</td>
                    <td>{enquiry.grade || '-'}</td>
                    <td><span className="badge badge-success">Approved</span></td>
                    <td>
                      <button
                        onClick={() => admitStudent(enquiry._id)}
                        className="btn btn-sm"
                        style={{ background: '#3498db', color: '#fff', marginRight: '5px' }}
                      >
                        Admit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '15px' }}>No approved applications</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ADMITTED STUDENTS ================= */}
      <div className="dash-card">
        <h3>Admitted Students</h3>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Admitted On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admittedStudents.length > 0 ? (
                admittedStudents.map(enquiry => (
                  <tr key={enquiry._id}>
                    <td>{enquiry.name || '-'}</td>
                    <td>{enquiry.email || '-'}</td>
                    <td>{enquiry.grade || '-'}</td>
                    <td>{enquiry.admittedOn ? new Date(enquiry.admittedOn).toLocaleDateString() : '-'}</td>
                    <td><span className="badge badge-success">Admitted</span></td>
                    <td>
                      <button
                        onClick={() => markAsOld(enquiry._id)}
                        className="btn btn-sm"
                        style={{ background: '#8e44ad', color: '#fff' }}
                      >
                        Mark Old
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '15px' }}>No admitted students</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= OLD STUDENTS ================= */}
      {/* <div className="dash-card">
        <h3>Old Students</h3>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {oldStudents.length > 0 ? (
                oldStudents.map(enquiry => (
                  <tr key={enquiry._id}>
                    <td>{enquiry.name || '-'}</td>
                    <td>{enquiry.email || '-'}</td>
                    <td>{enquiry.grade || '-'}</td>
                    <td><span className="badge badge-danger">Old Student</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '15px' }}>No old students</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
}
