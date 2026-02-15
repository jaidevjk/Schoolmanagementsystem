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
    // If no userId provided, create a User account for the teacher automatically
    if (!data.userId) {
      // require minimal fields for user creation
      if (!data.name || !data.email) return res.status(400).json({ message: 'Name and email required to create teacher.' });
      // generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
      const existing = await User.findOne({ email: data.email });
      if (existing) {
        // if a user exists, ensure it's a teacher
        if (existing.role !== 'teacher') return res.status(400).json({ message: 'Email already registered with different role.' });
        data.userId = existing._id;
      } else {
        const newUser = await User.create({ name: data.name, email: data.email, password: tempPassword, role: 'teacher', phone: data.phoneNumber || '' });
        data.userId = newUser._id;
      }
    } else {
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
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found.' });
    res.json({ message: 'Teacher deactivated.', teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
