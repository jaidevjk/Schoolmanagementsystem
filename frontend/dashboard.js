const studentsTable = document.getElementById("studentsTable");
const teachersTable = document.getElementById("teachersTable");
const attendanceTable = document.getElementById("attendanceTable");
const marksTable = document.getElementById("marksTable");

const token = localStorage.getItem("token");

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// Helper to fetch data
async function fetchData(endpoint) {
  const res = await fetch(`http://localhost:4003/admin/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
  });
  return res.json();
}

// Helper to send POST/PUT/DELETE
async function sendData(endpoint, method, body) {
  const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res.json();
}

// Load dashboard data
async function loadDashboard() {
  // ---------- Students ----------
  const students = await fetchData("students");
  studentsTable.innerHTML = "";
  students.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="border px-2 py-1">${s.name}</td>
                    <td class="border px-2 py-1">${s.email}</td>
                    <td class="border px-2 py-1">${s.class}</td>
                    <td class="border px-2 py-1">${s.section}</td>
                    <td class="border px-2 py-1">
                      <button onclick="editStudent('${s._id}')" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                      <button onclick="deleteStudent('${s._id}')" class="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                    </td>`;
    studentsTable.appendChild(tr);
  });

  // ---------- Teachers ----------
  const teachers = await fetchData("teacher");
  teachersTable.innerHTML = "";
  teachers.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="border px-2 py-1">${t.name}</td>
                    <td class="border px-2 py-1">${t.email}</td>
                    <td class="border px-2 py-1">
                      <button onclick="editTeacher('${t._id}')" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                      <button onclick="deleteTeacher('${t._id}')" class="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                    </td>`;
    teachersTable.appendChild(tr);
  });

  // ---------- Attendance ----------
  const attendance = await fetchData("attendance");
  attendanceTable.innerHTML = "";
  attendance.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="border px-2 py-1">${a.studentId}</td>
                    <td class="border px-2 py-1">${new Date(a.date).toLocaleDateString()}</td>
                    <td class="border px-2 py-1">${a.status}</td>
                    <td class="border px-2 py-1">
                      <button onclick="editAttendance('${a._id}')" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                      <button onclick="deleteAttendance('${a._id}')" class="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                    </td>`;
    attendanceTable.appendChild(tr);
  });

  // ---------- Marks ----------
  const marks = await fetchData("marks");
  marksTable.innerHTML = "";
  marks.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td class="border px-2 py-1">${m.studentId}</td>
                    <td class="border px-2 py-1">${m.subject}</td>
                    <td class="border px-2 py-1">${m.marks}</td>
                    <td class="border px-2 py-1">
                      <button onclick="editMarks('${m._id}')" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                      <button onclick="deleteMarks('${m._id}')" class="bg-red-500 px-2 py-1 rounded text-white">Delete</button>
                    </td>`;
    marksTable.appendChild(tr);
  });
}

window.onload = loadDashboard;

// ---------- STUDENTS CRUD ----------
async function addStudent() {
  const name = prompt("Enter student name:");
  const email = prompt("Enter student email:");
  const className = prompt("Enter class:");
  const section = prompt("Enter section:");
  if (!name || !email || !className || !section) return;

  await sendData("students", "POST", { name, email, class: className, section });
  loadDashboard();
}

async function editStudent(id) {
  const name = prompt("Enter new name:");
  const email = prompt("Enter new email:");
  const className = prompt("Enter new class:");
  const section = prompt("Enter new section:");
  await sendData(`students/${id}`, "PUT", { name, email, class: className, section });
  loadDashboard();
}

async function deleteStudent(id) {
  if (!confirm("Delete this student?")) return;
  await sendData(`students/${id}`, "DELETE");
  loadDashboard();
}

document.getElementById("addStudentBtn").addEventListener("click", addStudent);

// ---------- TEACHERS CRUD ----------
async function addTeacher() {
  const name = prompt("Enter teacher name:");
  const email = prompt("Enter teacher email:");
  if (!name || !email) return;

  await sendData("teachers", "POST", { name, email });
  loadDashboard();
}

async function editTeacher(id) {
  const name = prompt("Enter new name:");
  const email = prompt("Enter new email:");
  await sendData(`teachers/${id}`, "PUT", { name, email });
  loadDashboard();
}

async function deleteTeacher(id) {
  if (!confirm("Delete this teacher?")) return;
  await sendData(`teachers/${id}`, "DELETE");
  loadDashboard();
}

document.getElementById("addTeacherBtn").addEventListener("click", addTeacher);

// ---------- ATTENDANCE CRUD ----------
async function addAttendance() {
  const studentId = prompt("Enter student ID:");
  const date = prompt("Enter date (YYYY-MM-DD):");
  const status = prompt("Enter status (Present/Absent):");
  if (!studentId || !date || !status) return;

  await sendData("attendance", "POST", { studentId, date, status });
  loadDashboard();
}

async function editAttendance(id) {
  const studentId = prompt("Enter student ID:");
  const date = prompt("Enter date (YYYY-MM-DD):");
  const status = prompt("Enter status (Present/Absent):");
  await sendData(`attendance/${id}`, "PUT", { studentId, date, status });
  loadDashboard();
}

async function deleteAttendance(id) {
  if (!confirm("Delete this attendance record?")) return;
  await sendData(`attendance/${id}`, "DELETE");
  loadDashboard();
}

document.getElementById("addAttendanceBtn").addEventListener("click", addAttendance);

// ---------- MARKS CRUD ----------
async function addMarks() {
  const studentId = prompt("Enter student ID:");
  const subject = prompt("Enter subject:");
  const marks = prompt("Enter marks:");
  if (!studentId || !subject || !marks) return;

  await sendData("marks", "POST", { studentId, subject, marks });
  loadDashboard();
}

async function editMarks(id) {
  const studentId = prompt("Enter student ID:");
  const subject = prompt("Enter subject:");
  const marks = prompt("Enter marks:");
  await sendData(`marks/${id}`, "PUT", { studentId, subject, marks });
  loadDashboard();
}

async function deleteMarks(id) {
  if (!confirm("Delete this marks record?")) return;
  await sendData(`marks/${id}`, "DELETE");
  loadDashboard();
}

document.getElementById("addMarksBtn").addEventListener("click", addMarks);
// ---------- CHARTS ----------

// Attendance % Chart
function generateAttendanceChart(attendance) {
  const studentsSet = new Set(attendance.map(a => a.studentId));
  const labels = Array.from(studentsSet);

  const data = labels.map(id => {
    const records = attendance.filter(a => a.studentId === id);
    const presentCount = records.filter(r => r.status.toLowerCase() === "present").length;
    return Math.round((presentCount / records.length) * 100) || 0;
  });

  const ctx = document.getElementById("attendanceChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "% Attendance",
        data,
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

// Marks Average Chart
function generateMarksChart(marks) {
  const studentsSet = new Set(marks.map(m => m.studentId));
  const labels = Array.from(studentsSet);

  const data = labels.map(id => {
    const records = marks.filter(m => m.studentId === id);
    const avg = records.reduce((sum, r) => sum + Number(r.marks), 0) / records.length;
    return Math.round(avg) || 0;
  });

  const ctx = document.getElementById("marksChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Average Marks",
        data,
        backgroundColor: "rgba(255, 99, 132, 0.6)"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });
}

// Call charts inside loadDashboard()
generateAttendanceChart(attendance);
generateMarksChart(marks);
