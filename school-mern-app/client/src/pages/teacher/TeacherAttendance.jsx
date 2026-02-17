import { useState, useEffect, useMemo } from 'react';
import api from '../../api/axios';

export default function TeacherAttendance() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [viewMode, setViewMode] = useState('take'); // 'take' or 'history'
  const [loading, setLoading] = useState(false);

  // Take Attendance State
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({}); // { studentId: { status, remarks } }
  const [showAttendanceTable, setShowAttendanceTable] = useState(false);

  // History State
  const [historyFilter, setHistoryFilter] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    studentId: ''
  });
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [dropdownStudents, setDropdownStudents] = useState([]);

  // Stats Logic (Derived State)
  const stats = useMemo(() => {
    const total = students.length;
    let present = 0, absent = 0, leave = 0, late = 0;

    Object.values(attendanceData).forEach(st => {
      if (st.status === 'present') present++;
      if (st.status === 'absent') absent++;
      if (st.status === 'late') late++;
      if (st.status === 'leave') leave++;
    });

    return { total, present, absent, leave, late };
  }, [attendanceData, students]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setShowAttendanceTable(false);
      setStudents([]);
      setAttendanceData({});
      fetchStudentsForDropdown(selectedClass);
    } else {
      setStudents([]);
      setDropdownStudents([]);
    }
  }, [selectedClass]);

  const fetchClasses = () => {
    api.get('/classes')
      .then(res => setClasses(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error fetching classes", err));
  };

  const fetchStudentsForDropdown = async (classId) => {
    try {
      const res = await api.get(`/students?classId=${classId}`);
      setDropdownStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) { console.error(err); }
  };

  const handleGetAttendance = async () => {
    if (!selectedClass || !attendanceDate) {
      alert("Please select a class and date.");
      return;
    }

    setLoading(true);
    setShowAttendanceTable(true);
    try {
      // 1. Fetch Students
      const studentRes = await api.get(`/students?classId=${selectedClass}&status=active`);
      const studentsList = Array.isArray(studentRes.data) ? studentRes.data : [];
      setStudents(studentsList);

      // 2. Fetch Existing Attendance
      const attendanceRes = await api.get(`/attendance?classId=${selectedClass}&date=${attendanceDate}`);
      const existingAttendance = Array.isArray(attendanceRes.data) ? attendanceRes.data : [];

      // 3. Merge
      const initialData = {};
      studentsList.forEach(student => {
        const record = existingAttendance.find(a => a.studentId?._id === student._id);
        initialData[student._id] = {
          status: record ? record.status : 'present', // Default to present if new? Or null? Let's default to present for ease.
          remarks: record ? record.remarks : ''
        };
      });
      setAttendanceData(initialData);
    } catch (err) {
      console.error("Error fetching data", err);
      alert("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceHistory = () => {
    if (!selectedClass) return;
    setLoading(true);
    const { startDate, endDate, studentId } = historyFilter;
    let query = `/attendance?classId=${selectedClass}&startDate=${startDate}&endDate=${endDate}`;
    if (studentId) query += `&studentId=${studentId}`;

    api.get(query)
      .then(res => setAttendanceHistory(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error("Error fetching history", err))
      .finally(() => setLoading(false));
  };

  const handleAttendanceChange = (studentId, field, value) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value }
    }));
  };

  const markAll = (status) => {
    setAttendanceData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(id => {
        newData[id] = { ...newData[id], status };
      });
      return newData;
    });
  };

  const handleBulkSubmit = async () => {
    if (!window.confirm("Save attendance for this class?")) return;
    setLoading(true);
    try {
      const entries = Object.entries(attendanceData).map(([studentId, data]) => ({
        studentId,
        status: data.status,
        remarks: data.remarks
      }));

      await api.post('/attendance/bulk', {
        classId: selectedClass,
        date: attendanceDate,
        entries
      });
      alert("Attendance saved successfully!");
      handleGetAttendance();
    } catch (err) {
      console.error(err);
      alert("Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dash-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Teacher Attendance</h3>
        <div style={{ display: 'flex', gap: '5px', background: '#f0f2f5', padding: '4px', borderRadius: '8px' }}>
          <button
            onClick={() => { setViewMode('take'); setShowAttendanceTable(false); }}
            style={viewMode === 'take' ? tabActiveStyle : tabInactiveStyle}
          >
            Take Attendance
          </button>
          <button
            onClick={() => setViewMode('history')}
            style={viewMode === 'history' ? tabActiveStyle : tabInactiveStyle}
          >
            View History
          </button>
        </div>
      </div>

      {/* Top Controls */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'end', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <div style={{ minWidth: '250px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={inputStyle}
          >
            <option value="">-- Select Class --</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {loading && <div className="loading" style={{ margin: '10px 0' }}>Loading...</div>}

      {!selectedClass ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888', fontStyle: 'italic' }}>
          Please select a class from the dropdown above to manage attendance.
        </div>
      ) : (
        <>
          {viewMode === 'take' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'end', gap: '15px', flexWrap: 'wrap', background: '#fff', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#555' }}>Date</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <button onClick={handleGetAttendance} style={buttonSecondaryStyle}>Get Student List</button>
              </div>

              {showAttendanceTable && students.length > 0 && (
                <>
                  {/* Stats Dashboard */}
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <StatCard label="Total Students" value={stats.total} color="#34495e" />
                    <StatCard label="Present" value={stats.present} color="#27ae60" />
                    <StatCard label="Absent" value={stats.absent} color="#e74c3c" />
                    <StatCard label="Late" value={stats.late} color="#f39c12" />
                    <StatCard label="Leave" value={stats.leave} color="#3498db" />
                  </div>

                  {/* Bulk Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div>
                      <button onClick={() => markAll('present')} style={{ ...buttonOutlineStyle, color: '#27ae60', borderColor: '#27ae60', marginRight: '10px' }}>Mark All Present</button>
                      <button onClick={() => markAll('absent')} style={{ ...buttonOutlineStyle, color: '#e74c3c', borderColor: '#e74c3c' }}>Mark All Absent</button>
                    </div>
                    <button onClick={handleBulkSubmit} style={buttonPrimaryStyle}>Save Attendance</button>
                  </div>

                  <div className="dash-table-wrap" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Roll No</th>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Student Name</th>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #eee', width: '350px' }}>Status</th>
                          <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(s => {
                          const currentStatus = attendanceData[s._id]?.status;
                          return (
                            <tr key={s._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                              <td style={{ padding: '12px 15px' }}>{s.rollNumber || '-'}</td>
                              <td style={{ padding: '12px 15px', fontWeight: '500' }}>{s.name}</td>
                              <td style={{ padding: '12px 15px' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  {statusOptions.map(opt => (
                                    <button
                                      key={opt.value}
                                      onClick={() => handleAttendanceChange(s._id, 'status', opt.value)}
                                      style={{
                                        ...statusPillStyle,
                                        background: currentStatus === opt.value ? opt.color : '#fff',
                                        color: currentStatus === opt.value ? '#fff' : '#666',
                                        borderColor: currentStatus === opt.value ? opt.color : '#ddd',
                                      }}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </td>
                              <td style={{ padding: '12px 15px' }}>
                                <input
                                  type="text"
                                  placeholder="Note..."
                                  value={attendanceData[s._id]?.remarks || ''}
                                  onChange={(e) => handleAttendanceChange(s._id, 'remarks', e.target.value)}
                                  style={{ ...inputStyle, padding: '6px 10px', width: '100%' }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleBulkSubmit} style={{ ...buttonPrimaryStyle, padding: '12px 24px', fontSize: '16px' }}>Save Final Attendance</button>
                  </div>
                </>
              )}
              {showAttendanceTable && students.length === 0 && !loading && (
                <div style={{ padding: '20px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>No students found in this class.</div>
              )}
            </div>
          )}

          {viewMode === 'history' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'end', background: '#fff', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#666' }}>Start Date</label>
                  <input
                    type="date"
                    value={historyFilter.startDate}
                    onChange={(e) => setHistoryFilter({ ...historyFilter, startDate: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#666' }}>End Date</label>
                  <input
                    type="date"
                    value={historyFilter.endDate}
                    onChange={(e) => setHistoryFilter({ ...historyFilter, endDate: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#666' }}>Filter by Student</label>
                  <select
                    value={historyFilter.studentId}
                    onChange={(e) => setHistoryFilter({ ...historyFilter, studentId: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="">-- All Students --</option>
                    {dropdownStudents.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>
                <button onClick={fetchAttendanceHistory} style={buttonPrimaryStyle}>Search Records</button>
              </div>

              <div className="dash-table-wrap">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Student</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map(record => (
                      <tr key={record._id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>{new Date(record.date).toLocaleDateString()}</td>
                        <td style={{ padding: '12px', fontWeight: '500' }}>{record.studentId?.name || 'Unknown'}</td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              background: record.status === 'present' ? '#e8f8f5' : record.status === 'absent' ? '#fdedec' : '#fef9e7',
                              color: record.status === 'present' ? '#27ae60' : record.status === 'absent' ? '#c0392b' : '#f39c12',
                            }}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: '#666' }}>{record.remarks}</td>
                      </tr>
                    ))}
                    {attendanceHistory.length === 0 && !loading && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No attendance records found for this period.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Sub-components
const StatCard = ({ label, value, color }) => (
  <div style={{ flex: 1, minWidth: '120px', background: '#fff', border: `1px solid ${color}`, borderLeft: `5px solid ${color}`, borderRadius: '6px', padding: '10px 15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
    <div style={{ fontSize: '24px', fontWeight: 'bold', color: color }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
  </div>
);

// Constants
const statusOptions = [
  { value: 'present', label: 'P', color: '#27ae60' },
  { value: 'absent', label: 'A', color: '#e74c3c' },
  { value: 'late', label: 'L', color: '#f39c12' },
  { value: 'leave', label: 'Lv', color: '#3498db' },
];

// Styles
const inputStyle = { padding: '10px 14px', border: '1px solid #dcdcdc', borderRadius: '6px', fontSize: '14px', width: '100%', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s' };
const buttonPrimaryStyle = { background: '#3498db', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'background 0.2s' };
const buttonSecondaryStyle = { background: '#7f8c8d', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'background 0.2s' };
const buttonOutlineStyle = { background: 'transparent', border: '1px solid', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' };
const tabActiveStyle = { background: '#fff', padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#2c3e50', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' };
const tabInactiveStyle = { background: 'transparent', padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', color: '#7f8c8d' };

const statusPillStyle = {
  border: '1px solid #ddd',
  padding: '6px 0',
  width: '32px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.1s ease-in-out'
};
