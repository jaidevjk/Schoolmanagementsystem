import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  parentName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  address: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  description: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  // Step 1: Admin Approval
  approved: {
    type: Boolean,
    default: false
  },
  // Step 2: Admission Process Status
  admissionStatus: {
    type: String,
    enum: ['pending', 'approved', 'admitted', 'old'],
    default: 'pending'
  },
  // Step 3: Capture when admitted
  admittedAt: {
    type: Date,
    default: null
  },
  // To differentiate old students
  isOldStudent: {
    type: Boolean,
    default: false
  },
  // Reference to Student record (when admitted)
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);
