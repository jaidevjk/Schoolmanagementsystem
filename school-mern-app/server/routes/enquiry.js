import express from 'express';
import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';
import Student from '../models/Student.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST - Create enquiry
router.post('/', async (req, res) => {
  try {
    const { parentName, name, email, phonenumber, dob, gender, address, grade, description } = req.body;
    if (!parentName || !name || !email || !phonenumber || !dob || !gender || !address || !grade) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const dobDate = dob ? (typeof dob === 'string' ? new Date(dob) : dob) : undefined;
    if (!dobDate || isNaN(dobDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date of birth.' });
    }

    const enquiry = await Enquiry.create({
      parentName: String(parentName).trim(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phonenumber: Number(phonenumber),
      dob: dobDate,
      gender,
      address: String(address).trim(),
      grade: String(grade).trim(),
      description: Array.isArray(description) ? description : [],
      admissionStatus: 'pending',
      approved: false,
      isOldStudent: false
    });

    res.status(201).json({ message: 'Enquiry submitted successfully.', id: enquiry._id, enquiry });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const first = Object.values(err.errors)[0];
      return res.status(400).json({ message: first?.message || 'Validation failed.' });
    }
    console.error('Enquiry create error:', err);
    res.status(500).json({ message: err.message || 'Failed to submit enquiry.' });
  }
});

// GET - List all enquiries (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const list = await Enquiry.find().sort({ createdAt: -1 }).populate('studentId');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Single enquiry
router.get('/:id', protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate('studentId');
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update enquiry status
router.put('/:id', protect, async (req, res) => {
  try {
    const { admissionStatus, approved } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });

    // Update approval status
    if (approved !== undefined) {
      enquiry.approved = approved;
    }

    // Update admission status
    if (admissionStatus) {
      if (!['pending', 'approved', 'admitted', 'old'].includes(admissionStatus)) {
        return res.status(400).json({ message: 'Invalid admission status.' });
      }

      enquiry.admissionStatus = admissionStatus;

      // When status changes to 'admitted', create a Student record
      if (admissionStatus === 'admitted' && !enquiry.studentId) {
        try {
          // Create user account for student
          const studentUser = await User.create({
            name: enquiry.name,
            email: enquiry.email,
            password: 'student123', // Default password (will be hashed by pre-save hook)
            role: 'student',
            phone: String(enquiry.phonenumber)
          });

          // Create student record
          const student = await Student.create({
            userId: studentUser._id,
            enquiryId: enquiry._id,
            name: enquiry.name,
            email: enquiry.email,
            rollNumber: `STU-${Date.now()}`, // Auto-generate roll number
            fatherName: enquiry.parentName,
            dateOfBirth: enquiry.dob,
            gender: enquiry.gender,
            address: enquiry.address,
            phoneNumber: String(enquiry.phonenumber),
            parentPhoneNumber: String(enquiry.phonenumber),
            nationality: 'Indian',
            admissionDate: new Date(),
            status: 'active',
            isOldStudent: false
          });

          enquiry.studentId = student._id;
          enquiry.admittedAt = new Date();
        } catch (studentError) {
          console.error('Error creating student:', studentError);
          return res.status(500).json({ message: 'Enquiry approved but failed to create student record: ' + studentError.message });
        }
      }

      // When status changes to 'old', mark as old student
      if (admissionStatus === 'old' && enquiry.studentId) {
        enquiry.isOldStudent = true;
        await Student.findByIdAndUpdate(enquiry.studentId, { isOldStudent: true });
      }
    }

    await enquiry.save();
    const updated = await Enquiry.findById(req.params.id).populate('studentId');
    res.json({ message: 'Enquiry updated successfully.', enquiry: updated });
  } catch (err) {
    console.error('Enquiry update error:', err);
    res.status(500).json({ message: err.message || 'Failed to update enquiry.' });
  }
});

// DELETE - Delete enquiry
router.delete('/:id', protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json({ message: 'Enquiry deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
