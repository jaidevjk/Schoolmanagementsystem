import Marks from '../models/Marks.js';
import Student from '../models/Student.js';

export const getMarks = async (req, res) => {
  try {
    const { studentId, subjectId, classId, examType, academicYear } = req.query;
    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (subjectId) filter.subjectId = subjectId;
    if (classId) filter.classId = classId;
    if (examType) filter.examType = examType;
    if (academicYear) filter.academicYear = academicYear;
    const list = await Marks.find(filter)
      .populate('studentId')
      .populate('subjectId')
      .populate('classId')
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyMarks = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return res.status(404).json({ message: 'Student profile not found.' });
    const { academicYear } = req.query;
    const filter = { studentId: student._id };
    if (academicYear) filter.academicYear = academicYear;
    const list = await Marks.find(filter)
      .populate('subjectId')
      .populate('classId')
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMarks = async (req, res) => {
  try {
    const record = await Marks.create({ ...req.body, enteredBy: req.user._id });
    const populated = await Marks.findById(record._id)
      .populate('studentId')
      .populate('subjectId')
      .populate('classId');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMarks = async (req, res) => {
  try {
    const record = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('studentId')
      .populate('subjectId')
      .populate('classId');
    if (!record) return res.status(404).json({ message: 'Marks record not found.' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMarks = async (req, res) => {
  try {
    const record = await Marks.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Marks record not found.' });
    res.json({ message: 'Marks deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
