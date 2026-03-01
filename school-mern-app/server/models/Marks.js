import mongoose from 'mongoose';

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  examType: { type: String, enum: ['midterm', 'final', 'quiz', 'assignment'], required: true },
  examName: { type: String },
  marksObtained: { type: Number, required: true },
  maxMarks: { type: Number, default: 100 },
  term: { type: String },
  academicYear: { type: String },
  enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Marks', marksSchema);
