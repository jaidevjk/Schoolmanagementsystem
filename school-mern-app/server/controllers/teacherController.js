import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

export const getAllTeachers = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const teachers = await Teacher.find(filter)
      .populate('subjectIds')
      .populate('classIds')
      .sort({ name: 1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('subjectIds')
      .populate('classIds');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found.' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user._id })
      .populate('subjectIds')
      .populate('classIds');
    if (!teacher) return res.status(404).json({ message: 'Teacher profile not found.' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.userId) {
      const user = await User.findById(data.userId);
      if (!user || user.role !== 'teacher') return res.status(400).json({ message: 'Invalid user or role.' });
    }
    const teacher = await Teacher.create(data);
    const populated = await Teacher.findById(teacher._id).populate('subjectIds').populate('classIds');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('subjectIds')
      .populate('classIds');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found.' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found.' });
    res.json({ message: 'Teacher deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
