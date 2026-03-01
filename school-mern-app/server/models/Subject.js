import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  maxMarks: { type: Number, default: 100 },
  classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);
