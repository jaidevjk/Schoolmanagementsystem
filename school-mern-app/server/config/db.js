import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/school_mern';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (error.message.includes('querySrv') || error.message.includes('ECONNREFUSED')) {
      console.error('\n  If using Atlas and you see querySrv ECONNREFUSED:');
      console.error('  Your network/DNS may block SRV lookups. Use the STANDARD connection string instead:');
      console.error('  1. In Atlas: Cluster → Connect → "Connect using Mongo Shell" (or "Compass").');
      console.error('  2. Copy the mongodb://... URI (starts with mongodb:// not mongodb+srv://).');
      console.error('  3. Put it in .env as MONGO_URI=... (replace <password> with your DB password).\n');
    }
    process.exit(1);
  }
};

export default connectDB;
