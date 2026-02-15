import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

export const getAttendance = async (req, res) => {
  try {
    const { studentId, classId, date, startDate, endDate } = req.query;
    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (classId) filter.classId = classId;
    if (date) filter.date = new Date(date);
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const list = await Attendance.find(filter)
      .populate('studentId')
      .populate('classId')
      .sort({ date: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student profile not found.' });
    const { startDate, endDate } = req.query;
    const filter = { studentId: student._id };
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const list = await Attendance.find(filter).populate('classId').sort({ date: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { studentId, classId, date, status, remarks } = req.body;
    if (!studentId || !classId || !date || !status) {
      return res.status(400).json({ message: 'studentId, classId, date and status are required.' });
    }
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const existing = await Attendance.findOne({ studentId, classId, date: d });
    let record;
    if (existing) {
      record = await Attendance.findByIdAndUpdate(
        existing._id,
        { status, remarks, markedBy: req.user._id },
        { new: true }
      ).populate('studentId').populate('classId');
    } else {
      record = await Attendance.create({
        studentId,
        classId,
        date: d,
        status,
        remarks,
        markedBy: req.user._id,
      });
      record = await Attendance.findById(record._id).populate('studentId').populate('classId');
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const bulkMarkAttendance = async (req, res) => {
  try {
    const { classId, date, entries } = req.body;
    if (!classId || !date || !Array.isArray(entries)) {
      return res.status(400).json({ message: 'classId, date and entries array are required.' });
    }
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const results = [];
    for (const { studentId, status, remarks } of entries) {
      const existing = await Attendance.findOne({ studentId, classId, date: d });
      let record;
      if (existing) {
        record = await Attendance.findByIdAndUpdate(
          existing._id,
          { status: status || 'present', remarks, markedBy: req.user._id },
          { new: true }
        );
      } else {
        record = await Attendance.create({
          studentId,
          classId,
          date: d,
          status: status || 'present',
          remarks,
          markedBy: req.user._id,
        });
      }
      results.push(record);
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
