import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password and role are required.' });
    }
    if (!['admin', 'teacher', 'student'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered.' });

    const user = await User.create({ name, email, password, role });
    const token = createToken(user._id);
    const payload = { _id: user._id, name: user.name, email: user.email, role: user.role };
    res.status(201).json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password.' });

    const token = createToken(user._id);
    let profile = { _id: user._id, name: user.name, email: user.email, role: user.role };

    if (user.role === 'student') {
      const student = await Student.findOne({ userId: user._id }).populate('classId');
      profile = { ...profile, studentProfile: student };
    } else if (user.role === 'teacher') {
      const teacher = await Teacher.findOne({ userId: user._id })
        .populate('subjectIds')
        .populate('classIds');
      profile = { ...profile, teacherProfile: teacher };
    }

    res.json({ token, user: profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ message: 'User not found.' });
    }
    let profile = { _id: user._id, name: user.name, email: user.email, role: user.role };
    try {
      if (user.role === 'student') {
        const student = await Student.findOne({ userId: user._id }).populate('classId').lean();
        profile = { ...profile, studentProfile: student || null };
      } else if (user.role === 'teacher') {
        const teacher = await Teacher.findOne({ userId: user._id })
          .populate('subjectIds')
          .populate('classIds')
          .lean();
        profile = { ...profile, teacherProfile: teacher || null };
      }
    } catch (profileErr) {
      console.error('getMe profile fetch:', profileErr);
      profile.studentProfile = profile.studentProfile ?? null;
      profile.teacherProfile = profile.teacherProfile ?? null;
    }
    res.json(profile);
  } catch (err) {
    console.error('getMe error:', err);
    res.status(500).json({ message: err.message || 'Failed to load profile.' });
  }
};
