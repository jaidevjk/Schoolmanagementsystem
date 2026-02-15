import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    let profile = user.toObject();
    if (user.role === 'student') {
      const student = await Student.findOne({ userId: user._id }).populate('classId');
      profile.studentProfile = student;
    } else if (user.role === 'teacher') {
      const teacher = await Teacher.findOne({ userId: user._id })
        .populate('subjectIds')
        .populate('classIds');
      profile.teacherProfile = teacher;
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name }), ...(typeof isActive === 'boolean' && { isActive }) },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
