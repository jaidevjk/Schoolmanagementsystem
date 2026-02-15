import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import studentRoutes from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import classRoutes from './routes/classes.js';
import subjectRoutes from './routes/subjects.js';
import attendanceRoutes from './routes/attendance.js';
import marksRoutes from './routes/marks.js';
import enquiryRoutes from './routes/enquiry.js';
import passwordResetRoutes from './routes/passwordReset.js';
// const mongoose = require("mongoose");
// import path from 'path';
import mongoose from 'mongoose';

// Prefer environment-provided URIs. Provide a robust connect routine
// that tries the DNS SRV (+srv) URI first, then falls back to a
// direct (mongodb://) connection if SRV/DNS lookups fail.
// const srvConn = process.env.MONGO_SRV_URI || "mongodb+srv://monishakrishna465_db_user:23DSC035K@cluster0.3jrss8l.mongodb.net/?retryWrites=true&w=majority";
// const directConn = process.env.MONGO_URI || "mongodb://monishakrishna465_db_user:23DSC035K@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true";

// async function connectWithFallback() {
//   const opts = { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 };
//   try {
//     await mongoose.connect(srvConn, opts);
//     console.log('Connected to MongoDB (SRV)');
//   } catch (err) {
//     console.error('SRV connection failed:', err.message);
//     try {
//       await mongoose.connect(directConn, opts);
//       console.log('Connected to MongoDB (direct)');
//     } catch (err2) {
//       console.error('Direct connection failed:', err2.message);
//       // exit so the process doesn't run with no DB connection
//       process.exit(1);
//     }
//   }
// }
// connectWithFallback();

// mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));
// mongoose.connection.once('open', () => console.log('MongoDB connection open'));


// Prevent Mongoose strictQuery warning (Mongoose 7+)
// mongoose.set("strictQuery", false);

// const mongoConnUrl =
//   "mongodb://monishakrishna465_db_user:23DSC035K@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/schoolDB?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true&w=majority";

// // Modern connection options for Node 20+
// mongoose
//   .connect(mongoConnUrl, {
//     serverSelectionTimeoutMS: 10000, // wait 10s before failing
//     socketTimeoutMS: 45000,
//   })
//   .then(() => {
//     console.log("✅ MongoDB Connected (Node 20+)");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err.message);
//     process.exit(1);
//   });
//let mongoConnUrl = "mongodb+srv://monishakrishna465_db_user:23DSC035K@cluster0.3jrss8l.mongodb.net/";
let mongoConnUrl = process.env.MONGO_URI || "mongodb+srv://monishakrishna465_db_user:23DSC035K@cluster0.3jrss8l.mongodb.net/school_mern?retryWrites=true&w=majority";
mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", function (error) { console.log("Error came in connecting" + error); });
db.on("open", function () { console.log("yes, we are connected to mongodb and the database") });

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/password-reset', passwordResetRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'School Management API' });
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
