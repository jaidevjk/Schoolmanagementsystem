import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function TeacherAttendance() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [form, setForm] = useState({ date: '', studentId: '', classId: '', status: 'present' });
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    refresh();
    fetchStudents();
    fetchClasses();
  }, []);

  const refresh = () => {
    setLoading(true);
    api.get('/attendance')
      .then((res) => setList(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  const fetchStudents = () => {
    api.get('/students').then(res => setStudents(Array.isArray(res.data) ? res.data : [])).catch(() => { });
  };

  const fetchClasses = () => {
    api.get('/classes').then(res => setClasses(Array.isArray(res.data) ? res.data : [])).catch(() => { });
  };

  const openModal = (attendance = null) => {
    if (attendance) {
      setEditingAttendance(attendance);
      const dateStr = new Date(attendance.date).toISOString().split('T')[0];
      setForm({ date: dateStr, studentId: attendance.studentId?._id || '', classId: attendance.classId?._id || '', status: attendance.status || 'present' });
    } else {
      setEditingAttendance(null);
      const today = new Date().toISOString().split('T')[0];
      setForm({ date: today, studentId: '', classId: '', status: 'present' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAttendance(null);
    setForm({ date: '', studentId: '', classId: '', status: 'present' });
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAttendance) {
        await api.put(`/attendance/${editingAttendance._id}`, form);
        alert('Attendance updated');
      } else {
        await api.post('/attendance', form);
        alert('Attendance recorded');
      }
      refresh();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving attendance');
    }
  };

  const deleteAttendance = async (a) => {
    if (!confirm('Delete this attendance record?')) return;
    try {
      await api.delete(`/attendance/${a._id}`);
      refresh();
      alert('Attendance deleted');
    } catch (err) {
      alert('Failed to delete attendance');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Update Attendance</h3>
          <button onClick={() => openModal()} className="btn" style={{ background: '#3498db', color: '#fff' }}>+ Mark Attendance</button>
        </div>
        <p>View and manage attendance records for your classes.</p>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Class</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.slice(0, 50).map((a) => (
                <tr key={a._id}>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.studentId?.name}</td>
                  <td>{a.classId?.name}</td>
                  <td><span className={`badge badge-${a.status === 'present' ? 'success' : a.status === 'absent' ? 'danger' : 'warning'}`}>{a.status}</span></td>
                  <td>
                    <button className="btn" onClick={() => openModal(a)} style={{ marginRight: 6 }}>Edit</button>
                    <button className="btn" onClick={() => deleteAttendance(a)} style={{ background: '#e74c3c', color: '#fff' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length > 50 && <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>Showing first 50 records</p>}
        </div>
      </div>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ marginBottom: '20px' }}>{editingAttendance ? 'Edit Attendance' : 'Mark Attendance'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Date *</label>
                <input type="date" name="date" value={form.date} onChange={handleFormChange} required style={inputStyle} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Student *</label>
                <select name="studentId" value={form.studentId} onChange={handleFormChange} required style={inputStyle}>
                  <option value="">-- Select Student --</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Class *</label>
                <select name="classId" value={form.classId} onChange={handleFormChange} required style={inputStyle}>
                  <option value="">-- Select Class --</option>
                  {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Status *</label>
                <select name="status" value={form.status} onChange={handleFormChange} required style={inputStyle}>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="leave">Leave</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={buttonSecondaryStyle}>Cancel</button>
                <button type="submit" style={buttonPrimaryStyle}>{editingAttendance ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle = { background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' };
const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' };
const buttonPrimaryStyle = { background: '#3498db', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' };
const buttonSecondaryStyle = { background: '#95a5a6', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' };
