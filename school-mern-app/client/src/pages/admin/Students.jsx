import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', rollNumber: '', classId: '' });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    refresh();
    fetchClasses();
  }, []);

  const refresh = () => {
    setLoading(true);
    api.get('/students')
      .then((res) => setStudents(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  const fetchClasses = () => {
    api.get('/classes')
      .then((res) => setClasses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setClasses([]));
  };

  const openModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setForm({
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        classId: student.classId?._id || ''
      });
    } else {
      setEditingStudent(null);
      setForm({ name: '', email: '', rollNumber: '', classId: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setForm({ name: '', email: '', rollNumber: '', classId: '' });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await api.put(`/students/${editingStudent._id}`, form);
        alert('Student updated successfully');
      } else {
        await api.post('/students', form);
        alert('Student created successfully');
      }
      refresh();
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving student');
    }
  };

  const deactivateStudent = async (s) => {
    if (!confirm('Deactivate this student?')) return;
    try {
      await api.put(`/students/${s._id}`, { status: 'inactive' });
      refresh();
      alert('Student deactivated');
    } catch (err) {
      console.error(err);
      alert('Failed to deactivate student');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Students</h3>
          <button onClick={() => openModal()} className="btn" style={{ marginRight: 8, background: '#3498db', color: '#fff' }}>+ Add Student</button>
        </div>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.rollNumber}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.classId?.name || '-'} {s.section || ''}</td>
                  <td><span className={`badge badge-${s.status === 'active' ? 'success' : 'warning'}`}>{s.status}</span></td>
                  <td>
                    <button className="btn" onClick={() => openModal(s)} style={{ marginRight: 6 }}>Edit</button>
                    {s.status === 'active' ? (
                      <button className="btn" onClick={() => deactivateStudent(s)} style={{ background: '#e74c3c', color: '#fff' }}>Deactivate</button>
                    ) : (
                      <button className="btn" onClick={() => api.put(`/students/${s._id}`, { status: 'active' }).then(refresh)}>Activate</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============ MODAL ============ */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ marginBottom: '20px' }}>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  style={inputStyle}
                  placeholder="Student name"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  style={inputStyle}
                  placeholder="student@school.com"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={form.rollNumber}
                  onChange={handleFormChange}
                  style={inputStyle}
                  placeholder="e.g. 001"
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Class</label>
                <select
                  name="classId"
                  value={form.classId}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  <option value="">-- Select Class --</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={buttonSecondaryStyle}>Cancel</button>
                <button type="submit" style={buttonPrimaryStyle}>{editingStudent ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Modal styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: '#fff',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  width: '90%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const buttonPrimaryStyle = {
  background: '#3498db',
  color: '#fff',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const buttonSecondaryStyle = {
  background: '#95a5a6',
  color: '#fff',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};
