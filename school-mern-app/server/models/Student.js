import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  section: { type: String, default: 'A' },
  fatherName: { type: String },
  motherName: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  phoneNumber: { type: String },
  parentPhoneNumber: { type: String },
  bloodGroup: { type: String, default: '' },
  emergencyContactName: { type: String, default: '' },
  emergencyContactPhone: { type: String, default: '' },
  previousSchool: { type: String, default: '' },
  nationality: { type: String, default: 'Indian' },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive', 'graduated'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
