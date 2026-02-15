import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String },
  address: { type: String },
  grade: { type: String },
  description: { type: Array, default: [] },
  status: { type: String, enum: ['new', 'contacted', 'admitted'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);
