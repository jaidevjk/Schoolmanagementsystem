import { useState, useEffect } from 'react';
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
  const [showAttendanceTable, setShowAttendanceTable] = useState(false); // New state to control visibility

  // History State
  const [historyFilter, setHistoryFilter] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    studentId: ''
  });
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  // 1. Fetch Classes on Mount
  useEffect(() => {
    fetchClasses();
  }, []);

  // 2. Fetch Students when Class changes - NO, now we wait for button click for 'take' mode
  // However, for 'history' mode dropdown, we might still want students? 
  // The user requirement specifically asked for "get students list... based on classes... by clicking a button".
  // This likely applies to the 'Take Attendance' table.
  // For the History filter "Student (Optional)", it's helpful to have the list populated when class is selected.
  // I will keep a background fetch for students when class changes purely for the dropdowns, 
  // BUT I will NOT show the attendance table in 'take' mode until the button is clicked.

  useEffect(() => {
    if (selectedClass) {
      // Just fetching students for the dropdowns mostly, 
      // but in 'take' mode we will re-fetch or use this list when button clicked.
      // To be safe and strictly follow "get... by clicking", I will clear the 'students' list used for the TABLE
      // and maybe have a separate 'allClassStudents' for the dropdown? 
      // check: "Also add provion to get the students list ... by clicking a button"
      // Simplest: 
      // - Class selected -> Clear table, Hide table.
      // - Click "Get Attendance" -> Fetch students, Fetch attendance, Show table.
      setShowAttendanceTable(false);
      setStudents([]); // Clear current table students
      setAttendanceData({});
      // We still need students for the History mode "Student" dropdown. 
      // Let's implement a separate fetch for that or just fetch them when switching to History?
      // For now, let's just leave the history dropdown empty until they click "Search" or "Get Attendance"?
      // No, that's bad UX for history filter. 
      // I will fetch students silently for the dropdowns if we are in history mode.
      fetchStudentsForDropdown(selectedClass);
    } else {
      setStudents([]);
      setDropdownStudents([]);
    }
  }, [selectedClass]);

  const [dropdownStudents, setDropdownStudents] = useState([]);

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

  // Main function called by "Get Attendance" button
  const handleGetAttendance = async () => {
    if (!selectedClass || !attendanceDate) {
      alert("Please select a class and date.");
      return;
    }

    setLoading(true);
    setShowAttendanceTable(true); // Show the table container
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
          status: record ? record.status : 'present',
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
      // Optionally refresh data
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
      <h3>Teacher Attendance</h3>

      {/* Top Controls */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'end' }}>
        <div style={{ minWidth: '200px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={inputStyle}
          >
            <option value="">-- Select Class --</option>
            {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Mode</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className={`btn ${viewMode === 'take' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => { setViewMode('take'); setShowAttendanceTable(false); }}
              style={viewMode === 'take' ? buttonPrimaryStyle : buttonSecondaryStyle}
            >
              Take Attendance
            </button>
            <button
              className={`btn ${viewMode === 'history' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('history')}
              style={viewMode === 'history' ? buttonPrimaryStyle : buttonSecondaryStyle}
            >
              View History
            </button>
          </div>
        </div>
      </div>

      {loading && <div className="loading" style={{ margin: '10px 0' }}>Loading...</div>}

      {!selectedClass ? (
        <p>Please select a class to proceed.</p>
      ) : (
        <>
          {viewMode === 'take' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'end', gap: '15px', flexWrap: 'wrap' }}>
                <div>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Date</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <button onClick={handleGetAttendance} style={buttonSecondaryStyle}>Get Attendance</button>

                {showAttendanceTable && students.length > 0 && (
                  <button onClick={handleBulkSubmit} style={{ ...buttonPrimaryStyle, marginLeft: 'auto' }}>
                    Save Changes
                  </button>
                )}
              </div>

              {showAttendanceTable && (
                <div className="dash-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Student Name</th>
                        <th>Status</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => (
                        <tr key={s._id}>
                          <td>{s.rollNumber || '-'}</td>
                          <td>{s.name}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              {['present', 'absent', 'late', 'leave'].map(status => (
                                <label key={status} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                  <input
                                    type="radio"
                                    name={`status-${s._id}`}
                                    checked={attendanceData[s._id]?.status === status}
                                    onChange={() => handleAttendanceChange(s._id, 'status', status)}
                                    style={{ marginRight: '5px' }}
                                  />
                                  <span style={{ textTransform: 'capitalize' }}>{status}</span>
                                </label>
                              ))}
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              placeholder="Optional remark"
                              value={attendanceData[s._id]?.remarks || ''}
                              onChange={(e) => handleAttendanceChange(s._id, 'remarks', e.target.value)}
                              style={{ ...inputStyle, padding: '4px 8px' }}
                            />
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && !loading && <tr><td colSpan="4" style={{ textAlign: 'center' }}>No students found in this class.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {viewMode === 'history' && (
            <div className="animate-fade-in">
              {/* History Filters */}
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Start Date</label>
                  <input
                    type="date"
                    value={historyFilter.startDate}
                    onChange={(e) => setHistoryFilter({ ...historyFilter, startDate: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>End Date</label>
                  <input
                    type="date"
                    value={historyFilter.endDate}
                    onChange={(e) => setHistoryFilter({ ...historyFilter, endDate: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Student (Optional)</label>
                  <select
                    value={historyFilter.studentId}
                    onChange={(e) => setHistoryFilter({ ...historyFilter, studentId: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="">-- All Students --</option>
                    {dropdownStudents.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>
                <button onClick={fetchAttendanceHistory} style={buttonPrimaryStyle}>Search</button>
              </div>

              <div className="dash-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Student</th>
                      <th>Status</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map(record => (
                      <tr key={record._id}>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.studentId?.name || 'Unknown'}</td>
                        <td>
                          <span className={`badge badge-${record.status === 'present' ? 'success' : record.status === 'absent' ? 'danger' : 'warning'}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>{record.remarks}</td>
                      </tr>
                    ))}
                    {attendanceHistory.length === 0 && !loading && <tr><td colSpan="4" style={{ textAlign: 'center' }}>No attendance records found for this period.</td></tr>}
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

// Styling Constants
const inputStyle = { padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' };
const buttonPrimaryStyle = { background: '#3498db', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' };
const buttonSecondaryStyle = { background: '#95a5a6', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' };
