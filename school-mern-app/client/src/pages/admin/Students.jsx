import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkMessage, setBulkMessage] = useState({ type: '', text: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollNumber: '',
    classId: '',
    phoneNumber: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: 'Male',
    address: ''
  });
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
        classId: student.classId?._id || '',
        phoneNumber: student.phoneNumber || '',
        fatherName: student.fatherName || '',
        motherName: student.motherName || '',
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        gender: student.gender || 'Male',
        address: student.address || ''
      });
    } else {
      setEditingStudent(null);
      setForm({
        name: '',
        email: '',
        rollNumber: '',
        classId: '',
        phoneNumber: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        gender: 'Male',
        address: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setForm({
      name: '',
      email: '',
      rollNumber: '',
      classId: '',
      phoneNumber: '',
      fatherName: '',
      motherName: '',
      dateOfBirth: '',
      gender: 'Male',
      address: ''
    });
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

  const downloadSampleExcel = async () => {
    try {
      const response = await api.get('/students/bulk/sample', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students_sample.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentChild?.removeChild(link);
    } catch (err) {
      console.error(err);
      alert('Failed to download sample Excel');
    }
  };

  const handleBulkFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBulkLoading(true);
    setBulkMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/students/bulk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setBulkMessage({ type: 'success', text: `Successfully imported ${response.data.successCount} students!` });
      if (response.data.errors?.length > 0) {
        setBulkMessage({ type: 'warning', text: `Imported ${response.data.successCount} students. Failed: ${response.data.errors.length}` });
      }
      refresh();
      setTimeout(() => setShowBulkModal(false), 2000);
    } catch (err) {
      console.error(err);
      setBulkMessage({ type: 'error', text: err.response?.data?.message || 'Failed to import students' });
    } finally {
      setBulkLoading(false);
      e.target.value = '';
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Manage Students</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => openModal()} className="btn" style={{ marginRight: 8, background: '#3498db', color: '#fff' }}>+ Add Student</button>
            <button onClick={() => setShowBulkModal(true)} className="btn" style={{ background: '#27ae60', color: '#fff' }}>📊 Add Bulk</button>
          </div>
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
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleFormChange}
                  style={inputStyle}
                  placeholder="e.g. 9876543210"
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
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleFormChange}
                  style={inputStyle}
                  placeholder="Father's full name"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={form.motherName}
                  onChange={handleFormChange}
                  style={inputStyle}
                  placeholder="Mother's full name"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleFormChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleFormChange}
                  style={inputStyle}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  style={{ ...inputStyle, minHeight: '80px' }}
                  placeholder="Student's address"
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
              <div style={{ marginBottom: '12px', padding: '10px', background: '#f0f0f0', borderRadius: '4px', fontSize: '12px', color: '#666' }}>
                <strong>Note:</strong> A temporary password will be automatically generated for the student account.
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={buttonSecondaryStyle}>Cancel</button>
                <button type="submit" style={buttonPrimaryStyle}>{editingStudent ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ marginBottom: '20px' }}>Bulk Upload Students</h2>
            <p style={{ marginBottom: '12px' }}>Download sample, fill student rows and upload the Excel (.xlsx) file.</p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <button onClick={downloadSampleExcel} className="btn" style={{ background: '#3498db', color: '#fff' }}>Download Sample</button>
              <label style={{ display: 'inline-block', background: '#fff', border: '1px dashed #ccc', padding: '8px 12px', borderRadius: 4, cursor: 'pointer' }}>
                {bulkLoading ? 'Uploading...' : 'Choose Excel'}
                <input type="file" accept=".xlsx,.xls" onChange={handleBulkFileUpload} style={{ display: 'none' }} />
              </label>
            </div>
            {bulkMessage.text && <div style={{ marginBottom: 12, color: bulkMessage.type === 'error' ? 'red' : (bulkMessage.type === 'success' ? 'green' : 'orange') }}>{bulkMessage.text}</div>}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowBulkModal(false)} style={buttonSecondaryStyle}>Close</button>
            </div>
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
