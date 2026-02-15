import Student from '../models/Student.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const getAllStudents = async (req, res) => {
  try {
    const { classId, status } = req.query;
    const filter = {};
    if (classId) filter.classId = classId;
    if (status) filter.status = status;
    const students = await Student.find(filter).populate('classId').sort({ rollNumber: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id }).populate('classId');
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id }).populate('classId');
    if (!student) return res.status(404).json({ message: 'Student profile not found.' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.userId) {
      const user = await User.findById(data.userId);
      if (!user || user.role !== 'student') return res.status(400).json({ message: 'Invalid user or role.' });
    }
    const student = await Student.create(data);
    const populated = await Student.findById(student._id).populate('classId');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('classId');
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json({ message: 'Student deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
