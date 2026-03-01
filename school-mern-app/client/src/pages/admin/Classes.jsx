import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [form, setForm] = useState({ name: '', section: '', academicYear: '', capacity: '', classTeacherId: '' });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    refresh();
    fetchTeachers();
  }, []);

  const refresh = () => {
    setLoading(true);
    api.get('/classes')
      .then((res) => setClasses(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  const fetchTeachers = () => {
    api.get('/teachers').then(res => setTeachers(Array.isArray(res.data) ? res.data : [])).catch(() => { });
  };

  const openModal = (clazz = null) => {
    if (clazz) {
      setEditingClass(clazz);
      setForm({ name: clazz.name, section: clazz.section, academicYear: clazz.academicYear, capacity: clazz.capacity, classTeacherId: clazz.classTeacherId?._id || '' });
    } else {
      setEditingClass(null);
      setForm({ name: '', section: '', academicYear: '', capacity: '', classTeacherId: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClass(null);
    setForm({ name: '', section: '', academicYear: '', capacity: '', classTeacherId: '' });
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await api.put(`/classes/${editingClass._id}`, form);
        alert('Class updated');
      } else {
        await api.post('/classes', form);
        alert('Class created');
      }
      refresh();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving class');
    }
  };

  const deleteClass = async (c) => {
    if (!confirm('Delete this class?')) return;
    try {
      await api.delete(`/classes/${c._id}`);
      refresh();
      alert('Class deleted');
    } catch (err) {
      alert('Failed to delete class');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Classes</h3>
          <button onClick={() => openModal()} className="btn" style={{ background: '#3498db', color: '#fff' }}>+ Add Class</button>
        </div>
        <div className="dash-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Section</th>
                <th>Academic Year</th>
                <th>Class Teacher</th>
                <th>Capacity</th>
                <th>Actions</th>
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
                  <td>
                    <button className="btn" onClick={() => openModal(c)} style={{ marginRight: 6 }}>Edit</button>
                    <button className="btn" onClick={() => deleteClass(c)} style={{ background: '#e74c3c', color: '#fff' }}>Delete</button>
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
            <h2 style={{ marginBottom: '20px' }}>{editingClass ? 'Edit Class' : 'Add Class'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} required style={inputStyle} placeholder="Class name" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Section</label>
                <input type="text" name="section" value={form.section} onChange={handleFormChange} style={inputStyle} placeholder="A, B, C..." />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Academic Year</label>
                <input type="text" name="academicYear" value={form.academicYear} onChange={handleFormChange} style={inputStyle} placeholder="2024-2025" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Capacity</label>
                <input type="number" name="capacity" value={form.capacity} onChange={handleFormChange} style={inputStyle} placeholder="40" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Class Teacher</label>
                <select name="classTeacherId" value={form.classTeacherId} onChange={handleFormChange} style={inputStyle}>
                  <option value="">-- Select Teacher --</option>
                  {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={buttonSecondaryStyle}>Cancel</button>
                <button type="submit" style={buttonPrimaryStyle}>{editingClass ? 'Update' : 'Create'}</button>
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
