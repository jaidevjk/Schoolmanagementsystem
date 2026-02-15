import Class from '../models/Class.js';

export const getAllClasses = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const classes = await Class.find(filter).populate('classTeacherId').sort({ name: 1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id).populate('classTeacherId');
    if (!cls) return res.status(404).json({ message: 'Class not found.' });
    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createClass = async (req, res) => {
  try {
    const cls = await Class.create(req.body);
    const populated = await Class.findById(cls._id).populate('classTeacherId');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('classTeacherId');
    if (!cls) return res.status(404).json({ message: 'Class not found.' });
    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndDelete(req.params.id);
    if (!cls) return res.status(404).json({ message: 'Class not found.' });
    res.json({ message: 'Class deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
