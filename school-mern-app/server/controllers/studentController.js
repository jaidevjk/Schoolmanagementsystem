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
    // If no userId provided, create a User account for the student automatically
    if (!data.userId) {
      // require minimal fields for user creation
      if (!data.name || !data.email) return res.status(400).json({ message: 'Name and email required to create student.' });
      // generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
      const existing = await User.findOne({ email: data.email });
      if (existing) {
        // if a user exists, ensure it's a student
        if (existing.role !== 'student') return res.status(400).json({ message: 'Email already registered with different role.' });
        data.userId = existing._id;
      } else {
        const newUser = await User.create({ name: data.name, email: data.email, password: tempPassword, role: 'student', phone: data.phoneNumber || '' });
        data.userId = newUser._id;
      }
    } else {
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
    const student = await Student.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json({ message: 'Student deactivated.', student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
