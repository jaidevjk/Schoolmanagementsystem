import express from 'express';
import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { parentName, name, email, phonenumber, dob, gender, address, grade, Description } = req.body;
    if (!parentName || !name || !email || !phonenumber) {
      return res.status(400).json({ message: 'Parent name, student name, email and phone are required.' });
    }
    const dobDate = dob ? (typeof dob === 'string' ? new Date(dob) : dob) : undefined;
    if (dob && (isNaN(dobDate?.getTime()))) {
      return res.status(400).json({ message: 'Invalid date of birth.' });
    }
    const enquiry = await Enquiry.create({
      parentName: String(parentName).trim(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phonenumber: String(phonenumber).trim(),
      dob: dobDate,
      gender: gender || undefined,
      address: address || undefined,
      grade: grade || undefined,
      description: Array.isArray(Description) ? Description : [],
    });
    res.status(201).json({ message: 'Enquiry submitted successfully.', id: enquiry._id });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const first = Object.values(err.errors)[0];
      return res.status(400).json({ message: first?.message || 'Validation failed.' });
    }
    console.error('Enquiry create error:', err);
    res.status(500).json({ message: err.message || 'Failed to submit enquiry.' });
  }
});

router.get('/', protect, role('admin'), async (req, res) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
