import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import User from './models/User.js';
import Student from './models/Student.js';
import Teacher from './models/Teacher.js';
import Class from './models/Class.js';
import Subject from './models/Subject.js';
import Attendance from './models/Attendance.js';
import Marks from './models/Marks.js';
import Enquiry from './models/Enquiry.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jaidev:4AL15ME715@cluster0.vkf2h.mongodb.net/school_Db?appName=Cluster0';

const CREDENTIALS = [];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seed.');

    await User.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Class.deleteMany({});
    await Subject.deleteMany({});
    await Attendance.deleteMany({});
    await Marks.deleteMany({});
    await Enquiry.deleteMany({});

    // ---------- USERS ----------
    const admin1 = await User.create({ name: 'Admin User', email: 'admin@school.com', password: 'admin123', role: 'admin', phone: '9876500001' });
    const admin2 = await User.create({ name: 'Monisha', email: 'monisha@gmail.com', password: 'monisha', role: 'admin', phone: '7259411201' });

    const tUser1 = await User.create({ name: 'John Smith', email: 'teacher1@school.com', password: 'teacher123', role: 'teacher', phone: '9876543210' });
    const tUser2 = await User.create({ name: 'Sarah Johnson', email: 'teacher2@school.com', password: 'teacher123', role: 'teacher', phone: '9876543211' });
    const tUser3 = await User.create({ name: 'Rajesh Kumar', email: 'teacher3@school.com', password: 'teacher123', role: 'teacher', phone: '9876543212' });

    const sUser1 = await User.create({ name: 'Alice Williams', email: 'student1@school.com', password: 'student123', role: 'student', phone: '9123000001' });
    const sUser2 = await User.create({ name: 'Bob Brown', email: 'student2@school.com', password: 'student123', role: 'student', phone: '9123000002' });
    const sUser3 = await User.create({ name: 'Emma Davis', email: 'student3@school.com', password: 'student123', role: 'student', phone: '9123000003' });
    const sUser4 = await User.create({ name: 'Vikram Singh', email: 'student4@school.com', password: 'student123', role: 'student', phone: '9123000004' });
    const sUser5 = await User.create({ name: 'Priya Sharma', email: 'student5@school.com', password: 'student123', role: 'student', phone: '9123000005' });

    CREDENTIALS.push({ role: 'Admin', email: 'admin@school.com', password: 'admin123', name: 'Admin User' });
    CREDENTIALS.push({ role: 'Admin', email: 'monisha@gmail.com', password: 'monisha', name: 'Monisha' });
    CREDENTIALS.push({ role: 'Teacher', email: 'teacher1@school.com', password: 'teacher123', name: 'John Smith' });
    CREDENTIALS.push({ role: 'Teacher', email: 'teacher2@school.com', password: 'teacher123', name: 'Sarah Johnson' });
    CREDENTIALS.push({ role: 'Teacher', email: 'teacher3@school.com', password: 'teacher123', name: 'Rajesh Kumar' });
    CREDENTIALS.push({ role: 'Student', email: 'student1@school.com', password: 'student123', name: 'Alice Williams' });
    CREDENTIALS.push({ role: 'Student', email: 'student2@school.com', password: 'student123', name: 'Bob Brown' });
    CREDENTIALS.push({ role: 'Student', email: 'student3@school.com', password: 'student123', name: 'Emma Davis' });
    CREDENTIALS.push({ role: 'Student', email: 'student4@school.com', password: 'student123', name: 'Vikram Singh' });
    CREDENTIALS.push({ role: 'Student', email: 'student5@school.com', password: 'student123', name: 'Priya Sharma' });

    // ---------- CLASSES ----------
    const class10A = await Class.create({ name: 'Class 10', section: 'A', academicYear: '2024-25', capacity: 40, status: 'active' });
    const class10B = await Class.create({ name: 'Class 10', section: 'B', academicYear: '2024-25', capacity: 40, status: 'active' });
    const class9A = await Class.create({ name: 'Class 9', section: 'A', academicYear: '2024-25', capacity: 40, status: 'active' });
    const class8A = await Class.create({ name: 'Class 8', section: 'A', academicYear: '2024-25', capacity: 40, status: 'active' });

    // ---------- TEACHERS ----------
    const teacher1 = await Teacher.create({
      userId: tUser1._id, name: 'John Smith', email: tUser1.email, employeeId: 'T001',
      phoneNumber: '9876543210', qualification: 'M.Sc Mathematics', gender: 'Male',
      address: 'Bangalore', joinDate: new Date('2020-06-01'), subjectIds: [], classIds: [class10A._id, class9A._id], status: 'active',
    });
    const teacher2 = await Teacher.create({
      userId: tUser2._id, name: 'Sarah Johnson', email: tUser2.email, employeeId: 'T002',
      phoneNumber: '9876543211', qualification: 'M.A English', gender: 'Female',
      address: 'Bangalore', joinDate: new Date('2019-04-15'), subjectIds: [], classIds: [class10A._id, class10B._id], status: 'active',
    });
    const teacher3 = await Teacher.create({
      userId: tUser3._id, name: 'Rajesh Kumar', email: tUser3.email, employeeId: 'T003',
      phoneNumber: '9876543212', qualification: 'B.Sc Physics', gender: 'Male',
      address: 'Bangalore', joinDate: new Date('2021-07-01'), subjectIds: [], classIds: [class9A._id, class8A._id], status: 'active',
    });

    // ---------- SUBJECTS ----------
    const subMath = await Subject.create({ name: 'Mathematics', code: 'MATH101', maxMarks: 100, teacherId: teacher1._id, status: 'active', description: 'Core mathematics' });
    const subEng = await Subject.create({ name: 'English', code: 'ENG101', maxMarks: 100, teacherId: teacher2._id, status: 'active', description: 'English language and literature' });
    const subSci = await Subject.create({ name: 'Science', code: 'SCI101', maxMarks: 100, teacherId: teacher3._id, status: 'active', description: 'Physics, Chemistry, Biology' });
    const subHindi = await Subject.create({ name: 'Hindi', code: 'HIN101', maxMarks: 100, status: 'active', description: 'Second language' });

    await Teacher.findByIdAndUpdate(teacher1._id, { subjectIds: [subMath._id] });
    await Teacher.findByIdAndUpdate(teacher2._id, { subjectIds: [subEng._id] });
    await Teacher.findByIdAndUpdate(teacher3._id, { subjectIds: [subSci._id] });
    await Class.findByIdAndUpdate(class10A._id, { classTeacherId: teacher1._id });
    await Class.findByIdAndUpdate(class10B._id, { classTeacherId: teacher2._id });
    await Class.findByIdAndUpdate(class9A._id, { classTeacherId: teacher3._id });
    await Class.findByIdAndUpdate(class8A._id, {});

    // ---------- STUDENTS (with new schema fields) ----------
    const student1 = await Student.create({
      userId: sUser1._id, name: 'Alice Williams', email: sUser1.email, rollNumber: 'S001',
      classId: class10A._id, section: 'A', fatherName: 'Mr. Williams', motherName: 'Mrs. Williams',
      dateOfBirth: new Date('2010-05-15'), gender: 'Female', address: 'Madivala, Bangalore',
      phoneNumber: '9123000001', parentPhoneNumber: '9876510001', bloodGroup: 'O+',
      emergencyContactName: 'Mr. Williams', emergencyContactPhone: '9876510001',
      previousSchool: 'ABC Primary', nationality: 'Indian', status: 'active',
    });
    const student2 = await Student.create({
      userId: sUser2._id, name: 'Bob Brown', email: sUser2.email, rollNumber: 'S002',
      classId: class10A._id, section: 'A', fatherName: 'Mr. Brown', motherName: 'Mrs. Brown',
      dateOfBirth: new Date('2010-08-20'), gender: 'Male', address: 'Koramangala, Bangalore',
      phoneNumber: '9123000002', parentPhoneNumber: '9876510002', bloodGroup: 'B+',
      emergencyContactName: 'Mrs. Brown', emergencyContactPhone: '9876510002',
      previousSchool: 'XYZ School', nationality: 'Indian', status: 'active',
    });
    const student3 = await Student.create({
      userId: sUser3._id, name: 'Emma Davis', email: sUser3.email, rollNumber: 'S003',
      classId: class10B._id, section: 'B', fatherName: 'Mr. Davis', motherName: 'Mrs. Davis',
      dateOfBirth: new Date('2011-01-10'), gender: 'Female', address: 'HSR Layout, Bangalore',
      phoneNumber: '9123000003', parentPhoneNumber: '9876510003', bloodGroup: 'A+',
      emergencyContactName: 'Mr. Davis', emergencyContactPhone: '9876510003',
      previousSchool: 'St. Mary\'s', nationality: 'Indian', status: 'active',
    });
    const student4 = await Student.create({
      userId: sUser4._id, name: 'Vikram Singh', email: sUser4.email, rollNumber: 'S004',
      classId: class9A._id, section: 'A', fatherName: 'Mr. Singh', motherName: 'Mrs. Singh',
      dateOfBirth: new Date('2011-06-12'), gender: 'Male', address: 'Indiranagar, Bangalore',
      phoneNumber: '9123000004', parentPhoneNumber: '9876510004', bloodGroup: 'AB+',
      emergencyContactName: 'Mr. Singh', emergencyContactPhone: '9876510004',
      previousSchool: 'Delhi Public School', nationality: 'Indian', status: 'active',
    });
    const student5 = await Student.create({
      userId: sUser5._id, name: 'Priya Sharma', email: sUser5.email, rollNumber: 'S005',
      classId: class9A._id, section: 'A', fatherName: 'Mr. Sharma', motherName: 'Mrs. Sharma',
      dateOfBirth: new Date('2011-11-05'), gender: 'Female', address: 'Jayanagar, Bangalore',
      phoneNumber: '9123000005', parentPhoneNumber: '9876510005', bloodGroup: 'O+',
      emergencyContactName: 'Mrs. Sharma', emergencyContactPhone: '9876510005',
      previousSchool: 'Kendriya Vidyalaya', nationality: 'Indian', status: 'active',
    });

    // ---------- ATTENDANCE ----------
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today); twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await Attendance.create([
      { studentId: student1._id, classId: class10A._id, date: today, status: 'present', markedBy: admin1._id },
      { studentId: student2._id, classId: class10A._id, date: today, status: 'present', markedBy: admin1._id },
      { studentId: student3._id, classId: class10B._id, date: today, status: 'late', markedBy: admin1._id, remarks: 'Came after bell' },
      { studentId: student4._id, classId: class9A._id, date: today, status: 'present', markedBy: admin1._id },
      { studentId: student5._id, classId: class9A._id, date: today, status: 'absent', markedBy: admin1._id, remarks: 'Sick' },
      { studentId: student1._id, classId: class10A._id, date: yesterday, status: 'present', markedBy: admin1._id },
      { studentId: student2._id, classId: class10A._id, date: yesterday, status: 'absent', markedBy: admin1._id },
      { studentId: student3._id, classId: class10B._id, date: yesterday, status: 'present', markedBy: admin1._id },
      { studentId: student4._id, classId: class9A._id, date: yesterday, status: 'present', markedBy: admin1._id },
      { studentId: student5._id, classId: class9A._id, date: yesterday, status: 'present', markedBy: admin1._id },
      { studentId: student1._id, classId: class10A._id, date: twoDaysAgo, status: 'present', markedBy: admin1._id },
      { studentId: student2._id, classId: class10A._id, date: twoDaysAgo, status: 'present', markedBy: admin1._id },
      { studentId: student3._id, classId: class10B._id, date: twoDaysAgo, status: 'leave', markedBy: admin1._id, remarks: 'Family function' },
    ]);

    // ---------- MARKS ----------
    await Marks.create([
      { studentId: student1._id, subjectId: subMath._id, classId: class10A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 85, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser1._id },
      { studentId: student1._id, subjectId: subEng._id, classId: class10A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 78, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser2._id },
      { studentId: student1._id, subjectId: subSci._id, classId: class10A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 82, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser3._id },
      { studentId: student2._id, subjectId: subMath._id, classId: class10A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 72, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser1._id },
      { studentId: student2._id, subjectId: subEng._id, classId: class10A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 88, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser2._id },
      { studentId: student2._id, subjectId: subSci._id, classId: class10A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 65, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser3._id },
      { studentId: student3._id, subjectId: subMath._id, classId: class10B._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 90, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser1._id },
      { studentId: student3._id, subjectId: subEng._id, classId: class10B._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 92, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser2._id },
      { studentId: student4._id, subjectId: subMath._id, classId: class9A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 88, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser1._id },
      { studentId: student4._id, subjectId: subSci._id, classId: class9A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 76, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser3._id },
      { studentId: student5._id, subjectId: subEng._id, classId: class9A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 95, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser2._id },
      { studentId: student5._id, subjectId: subSci._id, classId: class9A._id, examType: 'midterm', examName: 'Mid Term', marksObtained: 80, maxMarks: 100, academicYear: '2024-25', enteredBy: tUser3._id },
      { studentId: student1._id, subjectId: subMath._id, classId: class10A._id, examType: 'quiz', examName: 'Unit Test 1', marksObtained: 18, maxMarks: 20, academicYear: '2024-25', enteredBy: tUser1._id },
      { studentId: student2._id, subjectId: subMath._id, classId: class10A._id, examType: 'quiz', examName: 'Unit Test 1', marksObtained: 15, maxMarks: 20, academicYear: '2024-25', enteredBy: tUser1._id },
    ]);

    // ---------- ENQUIRIES ----------
    await Enquiry.create([
      { parentName: 'Ramesh Gupta', name: 'Arjun Gupta', email: 'ramesh.g@email.com', phonenumber: '9988776655', dob: new Date('2016-03-10'), gender: 'Male', address: 'Whitefield, Bangalore', grade: 'LKG', status: 'new' },
      { parentName: 'Lakshmi Nair', name: 'Meera Nair', email: 'lakshmi.n@email.com', phonenumber: '9988776644', dob: new Date('2015-07-22'), gender: 'Female', address: 'Electronic City, Bangalore', grade: 'UKG', status: 'contacted' },
      { parentName: 'Suresh Reddy', name: 'Karthik Reddy', email: 'suresh.r@email.com', phonenumber: '9988776633', dob: new Date('2014-01-15'), gender: 'Male', address: 'Bannerghatta Road, Bangalore', grade: 'Grade 1', status: 'new' },
    ]);

    // ---------- WRITE CREDENTIALS FILE ----------
    const lines = [
      '========================================',
      '  V BLOOMS D WORLD SCHOOL - TEST LOGINS',
      '========================================',
      '',
      'Use these to test login and redirection:',
      '',
      '--- ADMIN (redirects to Admin Dashboard) ---',
      '  admin@school.com     /  admin123',
      '  monisha@gmail.com    /  monisha',
      '',
      '--- TEACHER (redirects to Teacher Dashboard) ---',
      '  teacher1@school.com  /  teacher123   (John Smith)',
      '  teacher2@school.com  /  teacher123   (Sarah Johnson)',
      '  teacher3@school.com  /  teacher123   (Rajesh Kumar)',
      '',
      '--- STUDENT (redirects to Student Dashboard) ---',
      '  student1@school.com  /  student123   (Alice Williams)',
      '  student2@school.com  /  student123   (Bob Brown)',
      '  student3@school.com  /  student123   (Emma Davis)',
      '  student4@school.com  /  student123   (Vikram Singh)',
      '  student5@school.com  /  student123   (Priya Sharma)',
      '',
      '========================================',
    ];
    fs.writeFileSync('LOGIN_CREDENTIALS.txt', lines.join('\n'), 'utf8');
    console.log('Credentials written to server/LOGIN_CREDENTIALS.txt');

    console.log('\nSeed completed successfully.\n');
    console.log('--- LOGIN CREDENTIALS (copy to test) ---\n');
    console.log('ADMIN:   admin@school.com     / admin123');
    console.log('ADMIN:   monisha@gmail.com   / monisha');
    console.log('TEACHER: teacher1@school.com  / teacher123');
    console.log('TEACHER: teacher2@school.com  / teacher123');
    console.log('TEACHER: teacher3@school.com  / teacher123');
    console.log('STUDENT: student1@school.com / student123');
    console.log('STUDENT: student2@school.com / student123');
    console.log('STUDENT: student3@school.com / student123');
    console.log('STUDENT: student4@school.com / student123');
    console.log('STUDENT: student5@school.com / student123');
    console.log('\n----------------------------------------\n');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
