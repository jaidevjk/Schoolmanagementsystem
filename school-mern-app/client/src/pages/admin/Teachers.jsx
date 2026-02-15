import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', employeeId: '', qualification: '' });

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    setLoading(true);
    api.get('/teachers')
      .then((res) => setTeachers(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  const openModal = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setForm({
        name: teacher.name,
        email: teacher.email,
        employeeId: teacher.employeeId,
        qualification: teacher.qualification || ''
      });
    } else {
      setEditingTeacher(null);
      setForm({ name: '', email: '', employeeId: '', qualification: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTeacher(null);
    setForm({ name: '', email: '', employeeId: '', qualification: '' });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await api.put(`/teachers/${editingTeacher._id}`, form);
        alert('Teacher updated successfully');
      } else {
        await api.post('/teachers', form);
        alert('Teacher created successfully (temporary password assigned)');
      }
      refresh();
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving teacher');
    }
  };

  const deactivateTeacher = async (t) => {
    if (!confirm('Deactivate this teacher?')) return;
    try {
      await api.put(`/teachers/${t._id}`, { status: 'inactive' });
      refresh();
      alert('Teacher deactivated');
    } catch (err) {
      console.error(err);
      alert('Failed to deactivate teacher');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Teachers</h3>
          <button onClick={() => openModal()} className="btn" style={{ marginRight: 8, background: '#3498db', color: '#fff' }}>+ Add Teacher</button>
        </div>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t._id}>
                  <td>{t.employeeId}</td>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.qualification || '-'}</td>
                  <td><span className={`badge badge-${t.status === 'active' ? 'success' : 'warning'}`}>{t.status}</span></td>
                  <td>
                    <button className="btn" onClick={() => openModal(t)} style={{ marginRight: 6 }}>Edit</button>
                    {t.status === 'active' ? (
                      <button className="btn" onClick={() => deactivateTeacher(t)} style={{ background: '#e74c3c', color: '#fff' }}>Deactivate</button>
                    ) : (
                      <button className="btn" onClick={() => api.put(`/teachers/${t._id}`, { status: 'active' }).then(refresh)}>Activate</button>
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
            <h2 style={{ marginBottom: '20px' }}>{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h2>
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
                  placeholder="Teacher name"
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
                  placeholder="teacher@school.com"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleFormChange}
                  style={inputStyle}
                  placeholder="e.g. T001"
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleFormChange}
                  style={inputStyle}
                  placeholder="e.g. M.Sc Mathematics"
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={buttonSecondaryStyle}>Cancel</button>
                <button type="submit" style={buttonPrimaryStyle}>{editingTeacher ? 'Update' : 'Create'}</button>
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
