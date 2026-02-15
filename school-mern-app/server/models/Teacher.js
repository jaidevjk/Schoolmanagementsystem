import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  qualification: { type: String },
  joinDate: { type: Date, default: Date.now },
  subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
