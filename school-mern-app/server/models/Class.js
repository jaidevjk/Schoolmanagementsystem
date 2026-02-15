import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  section: { type: String, default: 'A' },
  academicYear: { type: String, required: true },
  classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  capacity: { type: Number, default: 40 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Class', classSchema);
