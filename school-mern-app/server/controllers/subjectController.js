import Subject from '../models/Subject.js';

export const getAllSubjects = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const subjects = await Subject.find(filter).populate('teacherId').sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('teacherId');
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    const populated = await Subject.findById(subject._id).populate('teacherId');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('teacherId');
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });
    res.json({ message: 'Subject deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
