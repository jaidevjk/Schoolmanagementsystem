import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [form, setForm] = useState({ code: '', name: '', maxMarks: '', teacherId: '' });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    refresh();
    fetchTeachers();
  }, []);

  const refresh = () => {
    setLoading(true);
    api.get('/subjects')
      .then((res) => setSubjects(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  const fetchTeachers = () => {
    api.get('/teachers').then(res => setTeachers(Array.isArray(res.data) ? res.data : [])).catch(() => { });
  };

  const openModal = (subject = null) => {
    if (subject) {
      setEditingSubject(subject);
      setForm({ code: subject.code, name: subject.name, maxMarks: subject.maxMarks, teacherId: subject.teacherId?._id || '' });
    } else {
      setEditingSubject(null);
      setForm({ code: '', name: '', maxMarks: '', teacherId: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setForm({ code: '', name: '', maxMarks: '', teacherId: '' });
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await api.put(`/subjects/${editingSubject._id}`, form);
        alert('Subject updated');
      } else {
        await api.post('/subjects', form);
        alert('Subject created');
      }
      refresh();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving subject');
    }
  };

  const deleteSubject = async (s) => {
    if (!confirm('Delete this subject?')) return;
    try {
      await api.delete(`/subjects/${s._id}`);
      refresh();
      alert('Subject deleted');
    } catch (err) {
      alert('Failed to delete subject');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Subjects</h3>
          <button onClick={() => openModal()} className="btn" style={{ background: '#3498db', color: '#fff' }}>+ Add Subject</button>
        </div>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Max Marks</th>
                <th>Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s._id}>
                  <td>{s.code}</td>
                  <td>{s.name}</td>
                  <td>{s.maxMarks}</td>
                  <td>{s.teacherId?.name || '-'}</td>
                  <td>
                    <button className="btn" onClick={() => openModal(s)} style={{ marginRight: 6 }}>Edit</button>
                    <button className="btn" onClick={() => deleteSubject(s)} style={{ background: '#e74c3c', color: '#fff' }}>Delete</button>
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
            <h2 style={{ marginBottom: '20px' }}>{editingSubject ? 'Edit Subject' : 'Add Subject'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Code *</label>
                <input type="text" name="code" value={form.code} onChange={handleFormChange} required style={inputStyle} placeholder="e.g. ENG101" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} required style={inputStyle} placeholder="Subject name" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Max Marks</label>
                <input type="number" name="maxMarks" value={form.maxMarks} onChange={handleFormChange} style={inputStyle} placeholder="100" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Teacher</label>
                <select name="teacherId" value={form.teacherId} onChange={handleFormChange} style={inputStyle}>
                  <option value="">-- Select Teacher --</option>
                  {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={buttonSecondaryStyle}>Cancel</button>
                <button type="submit" style={buttonPrimaryStyle}>{editingSubject ? 'Update' : 'Create'}</button>
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
