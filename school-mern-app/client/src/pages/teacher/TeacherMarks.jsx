import { useState, useEffect, useMemo } from 'react';
import api from '../../api/axios';

export default function TeacherMarks() {
  const [loading, setLoading] = useState(false);

  // View Mode: 'enter', 'history', 'results'
  const [viewMode, setViewMode] = useState('results');

  // Dropdown Data
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // --- ENTER MARKS STATE ---
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('midterm');
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString());
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({}); // { studentId: { marksObtained, maxMarks } }
  const [showMarksTable, setShowMarksTable] = useState(false);

  // --- STUDENT HISTORY STATE ---
  const [historyClass, setHistoryClass] = useState('');
  const [historyStudent, setHistoryStudent] = useState('');
  const [classStudents, setClassStudents] = useState([]);
  const [studentHistory, setStudentHistory] = useState([]);

  // --- CLASS RESULTS STATE ---
  const [resultsClass, setResultsClass] = useState('');
  const [resultsExam, setResultsExam] = useState('midterm');
  const [resultsYear, setResultsYear] = useState(new Date().getFullYear().toString());
  const [matrixData, setMatrixData] = useState({ students: [], subjects: [], marks: {} });
  const [showResultsTable, setShowResultsTable] = useState(false);


  // Derived Stats (Enter Marks Mode)
  const stats = useMemo(() => {
    const marksValues = Object.values(marksData)
      .map(d => parseFloat(d.marksObtained))
      .filter(v => !isNaN(v));

    if (marksValues.length === 0) return { average: 0, max: 0, min: 0, count: 0 };

    const sum = marksValues.reduce((a, b) => a + b, 0);
    const average = (sum / marksValues.length).toFixed(1);
    const max = Math.max(...marksValues);
    const min = Math.min(...marksValues);

    return { average, max, min, count: marksValues.length };
  }, [marksData]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Reset table when selection changes (Enter Marks Mode)
  useEffect(() => {
    setShowMarksTable(false);
    setStudents([]);
    setMarksData({});
  }, [selectedClass, selectedSubject, selectedExam, academicYear]);

  // Fetch students when History Class changes
  useEffect(() => {
    if (historyClass) {
      fetchStudentsForHistory(historyClass);
    } else {
      setClassStudents([]);
      setHistoryStudent('');
    }
  }, [historyClass]);

  // Reset results table when selection changes (Class Results Mode)
  useEffect(() => {
    setShowResultsTable(false);
  }, [resultsClass, resultsExam, resultsYear]);


  const fetchInitialData = async () => {
    try {
      const [classRes, subjectRes] = await Promise.all([
        api.get('/classes'),
        api.get('/subjects')
      ]);
      setClasses(Array.isArray(classRes.data) ? classRes.data : []);
      setSubjects(Array.isArray(subjectRes.data) ? subjectRes.data : []);
    } catch (err) {
      console.error("Error loading initial data", err);
    }
  };

  const fetchStudentsForHistory = async (classId) => {
    try {
      const res = await api.get(`/students?classId=${classId}&status=active`);
      setClassStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching students for history", err);
    }
  };

  // --- HANDLERS: ENTER MARKS ---
  const handleGetStudentList = async () => {
    if (!selectedClass || !selectedSubject) {
      alert("Please select both Class and Subject.");
      return;
    }

    setLoading(true);
    setShowMarksTable(true);

    try {
      // 1. Fetch Students
      const studentRes = await api.get(`/students?classId=${selectedClass}&status=active`);
      const studentList = Array.isArray(studentRes.data) ? studentRes.data : [];
      setStudents(studentList);

      // 2. Fetch Existing Marks for this combo
      const query = `/marks?classId=${selectedClass}&subjectId=${selectedSubject}&examType=${selectedExam}&academicYear=${academicYear}`;
      const marksRes = await api.get(query);
      const existingMarks = Array.isArray(marksRes.data) ? marksRes.data : [];

      // 3. Merge Data
      const initialMarks = {};
      studentList.forEach(student => {
        const record = existingMarks.find(m => m.studentId?._id === student._id);
        initialMarks[student._id] = {
          marksObtained: record ? record.marksObtained : '',
          maxMarks: record ? record.maxMarks : 100
        };
      });
      setMarksData(initialMarks);

    } catch (err) {
      console.error("Error fetching students/marks", err);
      alert("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkChange = (studentId, field, value) => {
    setMarksData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: value }
    }));
  };

  const handleSaveAll = async () => {
    if (!window.confirm("Save marks for all students?")) return;
    setLoading(true);
    try {
      const marksPayload = Object.entries(marksData).map(([studentId, data]) => ({
        studentId,
        marksObtained: data.marksObtained,
        maxMarks: data.maxMarks
      })).filter(item => item.marksObtained !== '' && item.marksObtained !== null);

      if (marksPayload.length === 0) {
        alert("No marks entered to save.");
        setLoading(false);
        return;
      }

      await api.post('/marks/bulk', {
        classId: selectedClass,
        subjectId: selectedSubject,
        examType: selectedExam,
        academicYear,
        marks: marksPayload
      });

      alert("Marks saved successfully!");
      handleGetStudentList();
    } catch (err) {
      console.error("Error saving marks", err);
      alert("Failed to save marks.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS: HISTORY ---
  const handleGetStudentHistory = async () => {
    if (!historyStudent) {
      alert("Please select a student.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`/marks?studentId=${historyStudent}`);
      setStudentHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching history", err);
      alert("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS: CLASS RESULTS ---
  const handleGetClassResults = async () => {
    if (!resultsClass) {
      alert("Please select a class.");
      return;
    }
    setLoading(true);
    setShowResultsTable(true);
    try {
      // 1. Fetch Students
      const studentRes = await api.get(`/students?classId=${resultsClass}&status=active`);
      const studentList = Array.isArray(studentRes.data) ? studentRes.data : [];

      // 2. Fetch All Marks for Class + Exam + Year
      const query = `/marks?classId=${resultsClass}&examType=${resultsExam}&academicYear=${resultsYear}`;
      const marksRes = await api.get(query);
      const marksList = Array.isArray(marksRes.data) ? marksRes.data : [];

      // 3. Process into Matrix
      // Map: studentId -> { subjectId: mark }
      const marksMap = {};
      // Also collect all Subjects that appear in the marks or just stick to 'subjects' state?
      // Better to use 'subjects' state to ensure column order, assuming 'subjects' contains all relevant subjects.

      marksList.forEach(m => {
        const sid = m.studentId?._id;
        const subId = m.subjectId?._id;
        if (sid && subId) {
          if (!marksMap[sid]) marksMap[sid] = {};
          marksMap[sid][subId] = m.marksObtained;
        }
      });

      setMatrixData({
        students: studentList,
        subjects: subjects, // Use all subjects for columns
        marks: marksMap
      });

    } catch (err) {
      console.error("Error fetching class results", err);
      alert("Failed to load results.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="dash-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Teacher Marks Management</h3>
        <div style={{ display: 'flex', gap: '5px', background: '#f0f2f5', padding: '4px', borderRadius: '8px' }}>
          <button
            onClick={() => setViewMode('enter')}
            style={viewMode === 'enter' ? tabActiveStyle : tabInactiveStyle}
          >
            Enter Marks
          </button>
          <button
            onClick={() => setViewMode('results')}
            style={viewMode === 'results' ? tabActiveStyle : tabInactiveStyle}
          >
            Class Results
          </button>
          <button
            onClick={() => setViewMode('history')}
            style={viewMode === 'history' ? tabActiveStyle : tabInactiveStyle}
          >
            Student History
          </button>
        </div>
      </div>

      {/* --- ENTER MARKS VIEW --- */}
      {viewMode === 'enter' && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '10px', color: '#666' }}>Select criteria to enter marks for the entire class.</div>
          <div style={controlBarStyle}>
            <div style={{ minWidth: '180px', flex: 1 }}>
              <label style={labelStyle}>Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={inputStyle}>
                <option value="">-- Select Class --</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ minWidth: '180px', flex: 1 }}>
              <label style={labelStyle}>Subject</label>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} style={inputStyle}>
                <option value="">-- Select Subject --</option>
                {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <div style={{ minWidth: '150px', flex: 1 }}>
              <label style={labelStyle}>Exam Type</label>
              <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} style={inputStyle}>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div style={{ minWidth: '100px', flex: 1 }}>
              <label style={labelStyle}>Year</label>
              <input type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} style={inputStyle} />
            </div>
            <button onClick={handleGetStudentList} style={buttonPrimaryStyle} disabled={!selectedClass || !selectedSubject}>
              Get Student List
            </button>
          </div>

          {loading && <div className="loading" style={{ margin: '20px 0' }}>Loading...</div>}

          {showMarksTable && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <StatCard label="Class Average" value={`${stats.average}%`} color="#3498db" />
                <StatCard label="Highest" value={`${stats.max}`} color="#27ae60" />
                <StatCard label="Lowest" value={`${stats.min}`} color="#e74c3c" />
                <StatCard label="Papers Graded" value={stats.count} color="#8e44ad" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button onClick={handleSaveAll} style={buttonSuccessStyle}>Save All Marks</button>
              </div>

              <div className="dash-table-wrap" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      <th style={thStyle}>Roll No</th>
                      <th style={thStyle}>Student Name</th>
                      <th style={thStyle}>Marks Obtained</th>
                      <th style={thStyle}>Max Marks</th>
                      <th style={thStyle}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => {
                      const m = marksData[s._id] || { marksObtained: '', maxMarks: 100 };
                      const percent = m.marksObtained && m.maxMarks ? ((m.marksObtained / m.maxMarks) * 100).toFixed(1) : '-';
                      return (
                        <tr key={s._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={tdStyle}>{s.rollNumber || '-'}</td>
                          <td style={tdStyle}><b>{s.name}</b></td>
                          <td style={tdStyle}>
                            <input
                              type="number"
                              value={m.marksObtained}
                              onChange={(e) => handleMarkChange(s._id, 'marksObtained', e.target.value)}
                              placeholder="0"
                              style={tableInputStyle}
                              min="0"
                            />
                          </td>
                          <td style={tdStyle}>
                            <input
                              type="number"
                              value={m.maxMarks}
                              onChange={(e) => handleMarkChange(s._id, 'maxMarks', e.target.value)}
                              style={{ ...tableInputStyle, background: '#f9f9f9', width: '80px' }}
                            />
                          </td>
                          <td style={tdStyle}>
                            <span style={{
                              fontWeight: 'bold',
                              color: percent >= 40 ? '#27ae60' : percent !== '-' ? '#e74c3c' : '#bdc3c7'
                            }}>
                              {percent !== '-' ? `${percent}%` : '-'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {students.length === 0 && !loading && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>No students found in this class.</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- CLASS RESULTS VIEW --- */}
      {viewMode === 'results' && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '10px', color: '#666' }}>View consolidated results for the entire class.</div>
          <div style={controlBarStyle}>
            <div style={{ minWidth: '200px', flex: 1 }}>
              <label style={labelStyle}>Class</label>
              <select value={resultsClass} onChange={(e) => setResultsClass(e.target.value)} style={inputStyle}>
                <option value="">-- Select Class --</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ minWidth: '200px', flex: 1 }}>
              <label style={labelStyle}>Exam Type</label>
              <select value={resultsExam} onChange={(e) => setResultsExam(e.target.value)} style={inputStyle}>
                <option value="midterm">Midterm</option>
                <option value="final">Final</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div style={{ minWidth: '100px', flex: 1 }}>
              <label style={labelStyle}>Year</label>
              <input type="text" value={resultsYear} onChange={(e) => setResultsYear(e.target.value)} style={inputStyle} />
            </div>
            <button onClick={handleGetClassResults} style={buttonPrimaryStyle} disabled={!resultsClass}>
              Get Class Results
            </button>
          </div>

          {loading && <div className="loading" style={{ margin: '20px 0' }}>Loading...</div>}

          {showResultsTable && (
            <div className="dash-table-wrap" style={{ marginTop: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th style={{ ...thStyle, position: 'sticky', left: 0, background: '#f8f9fa', zIndex: 2 }}>Roll No</th>
                    <th style={{ ...thStyle, position: 'sticky', left: '80px', background: '#f8f9fa', zIndex: 2 }}>Student Name</th>
                    {matrixData.subjects.map(sub => (
                      <th key={sub._id} style={thStyle}>{sub.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixData.students.map(s => (
                    <tr key={s._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ ...tdStyle, position: 'sticky', left: 0, background: '#fff', fontWeight: 'bold' }}>{s.rollNumber || '-'}</td>
                      <td style={{ ...tdStyle, position: 'sticky', left: '80px', background: '#fff', fontWeight: 'bold' }}>{s.name}</td>
                      {matrixData.subjects.map(sub => {
                        const mark = matrixData.marks[s._id]?.[sub._id];
                        return (
                          <td key={sub._id} style={{ ...tdStyle, textAlign: 'center' }}>
                            {mark !== undefined ? (
                              <span style={{ fontWeight: 500, color: '#333' }}>{mark}</span>
                            ) : (
                              <span style={{ color: '#ccc' }}>-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {matrixData.students.length === 0 && !loading && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>No students found in this class.</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- STUDENT HISTORY VIEW --- */}
      {viewMode === 'history' && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '10px', color: '#666' }}>View marks history for a specific student across all subjects.</div>
          <div style={controlBarStyle}>
            <div style={{ minWidth: '200px', flex: 1 }}>
              <label style={labelStyle}>Class</label>
              <select value={historyClass} onChange={(e) => setHistoryClass(e.target.value)} style={inputStyle}>
                <option value="">-- Select Class --</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ minWidth: '200px', flex: 1 }}>
              <label style={labelStyle}>Student</label>
              <select value={historyStudent} onChange={(e) => setHistoryStudent(e.target.value)} style={inputStyle} disabled={!historyClass}>
                <option value="">-- Select Student --</option>
                {classStudents.map(s => <option key={s._id} value={s._id}>{s.name} ({s.rollNumber || '-'})</option>)}
              </select>
            </div>
            <button onClick={handleGetStudentHistory} style={buttonPrimaryStyle} disabled={!historyStudent}>
              Get History
            </button>
          </div>

          {loading && <div className="loading" style={{ margin: '20px 0' }}>Loading...</div>}

          {studentHistory.length > 0 && (
            <div className="dash-table-wrap" style={{ marginTop: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f8f9fa' }}>
                  <tr>
                    <th style={thStyle}>Subject</th>
                    <th style={thStyle}>Exam Type</th>
                    <th style={thStyle}>Marks</th>
                    <th style={thStyle}>Max Marks</th>
                    <th style={thStyle}>%</th>
                    <th style={thStyle}>Academic Year</th>
                  </tr>
                </thead>
                <tbody>
                  {studentHistory.map(mark => {
                    const percent = ((mark.marksObtained / mark.maxMarks) * 100).toFixed(1);
                    return (
                      <tr key={mark._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={tdStyle}>{mark.subjectId?.name || 'Unknown'}</td>
                        <td style={tdStyle}><span style={{ textTransform: 'capitalize' }}>{mark.examType}</span></td>
                        <td style={tdStyle}><b>{mark.marksObtained}</b></td>
                        <td style={tdStyle}>{mark.maxMarks}</td>
                        <td style={tdStyle}>
                          <span style={{ fontWeight: 'bold', color: percent >= 40 ? '#27ae60' : '#e74c3c' }}>
                            {percent}%
                          </span>
                        </td>
                        <td style={tdStyle}>{mark.academicYear}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {studentHistory.length === 0 && !loading && historyStudent && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>No marks history found for this student.</div>
          )}
        </div>
      )}
    </div>
  );
}

// Components
const StatCard = ({ label, value, color }) => (
  <div style={{ flex: 1, minWidth: '140px', background: '#fff', borderLeft: `4px solid ${color}`, borderRadius: '6px', padding: '15px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#7f8c8d', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
  </div>
);

// Styles
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#555' };
const inputStyle = { padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', width: '100%', boxSizing: 'border-box' };
const buttonPrimaryStyle = { background: '#3498db', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', height: '42px' };
const buttonSuccessStyle = { background: '#27ae60', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' };
const controlBarStyle = { display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'end', background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #eee' };
const thStyle = { padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee', color: '#555', fontSize: '14px' };
const tdStyle = { padding: '12px 15px', verticalAlign: 'middle' };
const tableInputStyle = { padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100px', textAlign: 'center', fontSize: '14px' };
const tabActiveStyle = { background: '#fff', padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#2c3e50', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' };
const tabInactiveStyle = { background: 'transparent', padding: '8px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', color: '#7f8c8d' };
