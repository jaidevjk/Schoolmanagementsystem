import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function TeacherMarks() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMark, setEditingMark] = useState(null);
  const [form, setForm] = useState({ studentId: '', subjectId: '', classId: '', examType: 'midterm', marksObtained: '', academicYear: '' });
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    refresh();
    fetchStudents();
    fetchSubjects();
    fetchClasses();
  }, []);

  const refresh = () => {
    setLoading(true);
    api.get('/marks')
      .then((res) => setList(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  const fetchStudents = () => {
    api.get('/students').then(res => setStudents(Array.isArray(res.data) ? res.data : [])).catch(() => { });
  };

  const fetchSubjects = () => {
    api.get('/subjects').then(res => setSubjects(Array.isArray(res.data) ? res.data : [])).catch(() => { });
  };

  const fetchClasses = () => {
    api.get('/classes').then(res => setClasses(Array.isArray(res.data) ? res.data : [])).catch(() => { });
  };

  const openModal = (mark = null) => {
    if (mark) {
      setEditingMark(mark);
      setForm({ studentId: mark.studentId?._id || '', subjectId: mark.subjectId?._id || '', classId: mark.classId?._id || '', examType: mark.examType || 'midterm', marksObtained: mark.marksObtained || '', academicYear: mark.academicYear || '' });
    } else {
      setEditingMark(null);
      setForm({ studentId: '', subjectId: '', classId: '', examType: 'midterm', marksObtained: '', academicYear: new Date().getFullYear().toString() });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMark(null);
    setForm({ studentId: '', subjectId: '', classId: '', examType: 'midterm', marksObtained: '', academicYear: '' });
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMark) {
        await api.put(`/marks/${editingMark._id}`, form);
        alert('Marks updated');
      } else {
        await api.post('/marks', form);
        alert('Marks recorded');
      }
      refresh();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving marks');
    }
  };

  const deleteMark = async (m) => {
    if (!confirm('Delete this mark record?')) return;
    try {
      await api.delete(`/marks/${m._id}`);
      refresh();
      alert('Mark deleted');
    } catch (err) {
      alert('Failed to delete mark');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Enter Grades</h3>
          <button onClick={() => openModal()} className="btn" style={{ background: '#3498db', color: '#fff' }}>+ Add Marks</button>
        </div>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Exam</th>
                <th>Marks</th>
                <th>Academic Year</th>
                <th>Actions</th>
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
                  <td>
                    <button className="btn" onClick={() => openModal(m)} style={{ marginRight: 6 }}>Edit</button>
                    <button className="btn" onClick={() => deleteMark(m)} style={{ background: '#e74c3c', color: '#fff' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ marginBottom: '20px' }}>{editingMark ? 'Edit Marks' : 'Add Marks'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Student *</label>
                <select name="studentId" value={form.studentId} onChange={handleFormChange} required style={inputStyle}>
                  <option value="">-- Select Student --</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Subject *</label>
                <select name="subjectId" value={form.subjectId} onChange={handleFormChange} required style={inputStyle}>
                  <option value="">-- Select Subject --</option>
                  {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Class *</label>
                <select name="classId" value={form.classId} onChange={handleFormChange} required style={inputStyle}>
                  <option value="">-- Select Class --</option>
                  {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Exam Type *</label>
                <select name="examType" value={form.examType} onChange={handleFormChange} required style={inputStyle}>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Marks Obtained *</label>
                <input type="number" name="marksObtained" value={form.marksObtained} onChange={handleFormChange} required style={inputStyle} placeholder="e.g. 85" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Academic Year</label>
                <input type="text" name="academicYear" value={form.academicYear} onChange={handleFormChange} style={inputStyle} placeholder="2024-2025" />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={buttonSecondaryStyle}>Cancel</button>
                <button type="submit" style={buttonPrimaryStyle}>{editingMark ? 'Update' : 'Save'}</button>
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
