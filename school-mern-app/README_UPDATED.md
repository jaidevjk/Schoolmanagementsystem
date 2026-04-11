# 📚 School MERN App - Complete Setup & Implementation Guide

## 🎯 Overview

This is a complete MERN (MongoDB, Express, React, Node.js) school management system with:
- ✅ User authentication (Login/Register)
- ✅ Password reset management
- ✅ Role-based access (Admin, Teacher, Student)
- ✅ Admin dashboard
- ✅ Attendance tracking
- ✅ Marks management
- ✅ Professional UI/UX

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager

### Step 1: Reset Admin Password
```bash
cd school-mern-app/server
node admin-reset.js
```

**Save the credentials shown!**
```
Email: admin@school.com
Password: Admin123456
```

### Step 2: Start Backend
```bash
# From school-mern-app/server
npm start
# Expected: "✅ Server running on http://localhost:5000"
```

### Step 3: Start Frontend (New Terminal)
```bash
# From school-mern-app/client
npm start
# Expected: App opens in browser
```

### Step 4: Login
- Navigate to `http://localhost:5173/login`
- Enter admin credentials
- Should see admin dashboard ✅

---

## ✨ What's New (Latest Updates)

### 🆕 Features Added

1. **User Registration Page** (`client/src/pages/Register.jsx`)
   - Full-featured registration form
   - Name, Email, Password, Confirm Password, Role
   - Form validation
   - Student & Teacher role selection
   - Error & success messages

2. **Enhanced Login Page** (`client/src/pages/Login.jsx`)
   - Added "Create New Account" link
   - Added "Reset Password" link
   - Professional styling
   - Better UX

3. **Admin Reset Script** (`server/admin-reset.js`)
   - One-command admin password reset
   - Creates admin if doesn't exist
   - Automatic credential generation
   - Full error handling

4. **Updated Routes** (`client/src/App.jsx`)
   - `/register` → Registration page
   - `/password-reset` → Password reset page
   - Both public (no login required)

---

## 📋 User Flows

### Registration Flow
```
Login Page
  ↓
  [Create New Account Button]
  ↓
Registration Page
  ├─ Fill Name
  ├─ Fill Email
  ├─ Fill Password
  ├─ Confirm Password
  ├─ Select Role (Student/Teacher)
  └─ [Create Account]
  ↓
POST /api/auth/register
  ├─ Validate input
  └─ Create user if email doesn't exist
  ↓
Success → Redirect to Login
Error → Show error message
```

### Login Flow
```
Login Page
  ├─ Enter Email
  ├─ Enter Password
  └─ [Sign in]
  ↓
POST /api/auth/login
  ├─ Verify credentials
  └─ Generate JWT token
  ↓
Success → Set token & Redirect to Dashboard
Error → Show error message
```

### Password Reset Flow
```
Login Page
  ↓
  [Reset Password Button]
  ↓
Password Reset Page
  ├─ Enter Email
  ├─ Enter Reason
  └─ [Submit Request]
  ↓
Request stored & Admin notified
  ↓
Admin Reviews & Approves
  ↓
User Gets Notification
  ↓
User Sets New Password
```

---

## 🏗️ Project Structure

```
school-mern-app/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx           # ✅ Updated - login with links
│   │   │   ├── Register.jsx        # ✨ NEW - registration form
│   │   │   ├── PasswordReset.jsx   # Password reset management
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── Students.jsx
│   │   │   │   ├── Teachers.jsx
│   │   │   │   ├── Classes.jsx
│   │   │   │   ├── Subjects.jsx
│   │   │   │   ├── AttendancePage.jsx
│   │   │   │   └── MarksPage.jsx
│   │   │   ├── teacher/
│   │   │   │   ├── TeacherDashboard.jsx
│   │   │   │   ├── TeacherAttendance.jsx
│   │   │   │   └── TeacherMarks.jsx
│   │   │   ├── student/
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   ├── StudentAttendance.jsx
│   │   │   │   └── StudentMarks.jsx
│   │   │   └── public/
│   │   │       ├── Home.jsx
│   │   │       ├── About.jsx
│   │   │       ├── Academics.jsx
│   │   │       ├── Admission.jsx
│   │   │       ├── Gallery.jsx
│   │   │       └── Contact.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── PublicLayout.jsx
│   │   │   ├── RoleDashboard.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── App.jsx                 # ✅ Updated - added routes
│   │   └── main.jsx
│   └── package.json
│
├── server/                          # Node.js Backend
│   ├── controllers/
│   │   ├── authController.js       # Login/Register logic
│   │   ├── passwordResetController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   ├── attendanceController.js
│   │   ├── marksController.js
│   │   └── ...
│   ├── models/
│   │   ├── User.js                 # User schema (all roles)
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Class.js
│   │   ├── Subject.js
│   │   ├── Attendance.js
│   │   ├── Marks.js
│   │   ├── PasswordResetRequest.js
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js                 # Auth endpoints
│   │   ├── users.js
│   │   ├── students.js
│   │   ├── teachers.js
│   │   ├── classes.js
│   │   ├── subjects.js
│   │   ├── attendance.js
│   │   ├── marks.js
│   │   ├── passwordReset.js        # Password management
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   └── ...
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── admin-reset.js              # ✨ NEW - admin reset script
│   ├── MONGODB_ADMIN_RESET.js      # Manual database reset guide
│   ├── server.js                   # Express server
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── seed.js                     # Database seeding
│
├── MERN_SETUP_GUIDE.md             # Complete setup instructions
├── MERN_SETUP_CHECKLIST.md         # Quick checklist
├── IMPLEMENTATION_SUMMARY.md       # Technical details
├── QUICK_REFERENCE.md              # Quick reference card
└── README.md                       # This file
```

---

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
GET    /api/auth/me                # Get current user (protected)
```

### Password Reset
```
POST   /api/password-reset/request                # Request password reset
GET    /api/password-reset/pending                # Get pending requests (admin)
PUT    /api/password-reset/:id/approve            # Approve reset request
PUT    /api/password-reset/:id/reject             # Reject reset request
POST   /api/password-reset/reset-password         # Set new password
GET    /api/password-reset/history                # Get user history
```

### Students
```
GET    /api/students                # List all students
POST   /api/students                # Create student
GET    /api/students/:id            # Get student
PUT    /api/students/:id            # Update student
DELETE /api/students/:id            # Delete student
```

### Teachers
```
GET    /api/teachers                # List all teachers
POST   /api/teachers                # Create teacher
GET    /api/teachers/:id            # Get teacher
PUT    /api/teachers/:id            # Update teacher
DELETE /api/teachers/:id            # Delete teacher
```

### Classes, Subjects, Attendance, Marks
```
GET    /api/classes                 # List all classes
POST   /api/classes                 # Create class
... (similar CRUD operations for other resources)
```

---

## 🔐 Credentials & Access

### Admin Account
After running `node admin-reset.js`:
```
Email:    admin@school.com
Password: Admin123456
Access:   Full system access
```

### Test Accounts (if seeded)
```
Teacher:
Email:    teacher1@school.com
Password: teacher123

Student:
Email:    student1@school.com
Password: student123
```

### Role Permissions
```
ADMIN:
  - Manage users (create, update, delete)
  - Manage classes, subjects
  - View all records
  - Approve password resets
  - System settings

TEACHER:
  - View assigned classes
  - Manage attendance
  - Manage marks
  - Request password reset
  - View student records

STUDENT:
  - View own attendance
  - View own marks
  - View class schedule
  - Request password reset
```

---

## 🛠️ Configuration

### Environment Setup

Create `.env` file in `server/` directory:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/school_db
# OR for MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/school_db?retryWrites=true&w=majority

# JWT Secret (create a strong secret)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# (Optional) Email configuration for password reset notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 📦 Installation & Setup

### 1. Install Dependencies

**Backend:**
```bash
cd school-mern-app/server
npm install
```

**Frontend:**
```bash
cd school-mern-app/client
npm install
```

### 2. Database Setup

**Local MongoDB:**
```bash
# Make sure MongoDB is running
mongod
```

**MongoDB Atlas (Cloud):**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to `.env` as MONGO_URI

### 3. Seed Initial Data (Optional)
```bash
cd school-mern-app/server
npm run seed
```

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd school-mern-app/server
npm start
# Will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd school-mern-app/client
npm start
# Will open http://localhost:5173
```

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
# Creates optimized build in dist/
```

**Start Production Server:**
```bash
cd server
npm run build          # If applicable
NODE_ENV=production npm start
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login page loads
- [ ] Register button works
- [ ] Can create new account
- [ ] Can login with new credentials
- [ ] Dashboard accessible
- [ ] Can logout
- [ ] Password reset flow works
- [ ] Admin can approve resets
- [ ] All dashboards load by role

### Sample Test Data

**Admin:**
- Email: admin@school.com
- Password: Admin123456 (generated)

**To create more users:**
1. Login as admin
2. Go to Users/Students/Teachers section
3. Click "Add New"
4. Fill details
5. Save

---

## 🐛 Troubleshooting

### "Server error. Is backend running?"
```bash
# Make sure backend is running
cd school-mern-app/server
npm start
# Should show: ✅ Server running on http://localhost:5000
```

### "Cannot find module..."
```bash
# Install missing dependencies
npm install
```

### MongoDB Connection Error
```
1. Check MONGO_URI in .env
2. Verify MongoDB is running
3. If using Atlas, check IP whitelist
4. Verify credentials
```

### "Cannot GET /register"
```
1. Make sure frontend is running
2. Check client/src/App.jsx has register route
3. Clear browser cache
```

### Admin Not Found
```bash
# Reset admin password
cd server
node admin-reset.js
```

### Port Already In Use
```bash
# For Linux/Mac:
lsof -i :5000
kill -9 <PID>

# For Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 📚 Documentation Files

### Quick Start (Pick One)
1. **QUICK_REFERENCE.md** - One-page reference
2. **MERN_SETUP_CHECKLIST.md** - Step-by-step checklist
3. **MERN_SETUP_GUIDE.md** - Detailed guide
4. **IMPLEMENTATION_SUMMARY.md** - Technical overview

### Admin Tools
- **server/admin-reset.js** - One-command admin reset
- **server/MONGODB_ADMIN_RESET.js** - Manual database reset

---

## 🔒 Security Best Practices

1. ✅ **Change Admin Password** after first login
2. ✅ **Use Strong Passwords** (8+ characters, mix of types)
3. ✅ **Keep .env Secure** - Never commit to Git
4. ✅ **Enable HTTPS** in production
5. ✅ **Validate All Input** on backend
6. ✅ **Use Environment Variables** for secrets
7. ✅ **Regular Backups** of MongoDB
8. ✅ **Monitor Password Requests** regularly
9. ✅ **Enable 2FA** (if applicable)
10. ✅ **Keep Dependencies Updated** - Run `npm audit`

### .gitignore Entry
```
# In .gitignore, make sure to exclude:
.env
.env.local
node_modules/
dist/
build/
```

---

## 🚀 Deployment

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Docker Deployment
```bash
# Build Docker image
docker build -t school-mern .

# Run container
docker run -p 5000:5000 -p 5173:5173 school-mern
```

### AWS/Azure/GCP
Follow platform-specific guides for Node.js + MongoDB deployment

---

## 📞 Support & Help

### Common Questions

**Q: How do I change the admin password?**
A: Run `node admin-reset.js` or manually update in database

**Q: Can I have multiple admins?**
A: Yes! Create more admin users in the admin dashboard

**Q: How do I export attendance/marks?**
A: Use admin dashboard export feature or query database directly

**Q: Can I customize the UI?**
A: Yes! Edit React components in `client/src/`

**Q: How do I add more fields to student form?**
A: Update Student model and edit form in admin dashboard

---

## 📝 Version History

### v1.0.0 (Current)
- ✅ Complete authentication system
- ✅ User registration & login
- ✅ Password reset workflow
- ✅ Admin dashboard
- ✅ Attendance tracking
- ✅ Marks management
- ✅ Role-based access
- ✅ Modern React UI

---

## 🎯 Getting Help

1. **Check Documentation** - Read MERN_SETUP_GUIDE.md
2. **Run Admin Reset** - `node admin-reset.js`
3. **Check Console** - Browser console for frontend errors
4. **Check Server Logs** - Terminal for backend errors
5. **Verify MongoDB** - Check connection status

---

## 🤝 Contributing

To contribute improvements:
1. Create a new branch
2. Make changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create pull request

---

## 📄 License

This project is for educational purposes. Modify as needed for your school.

---

## ✨ Summary

Your School MERN App is now ready with:
- ✅ Professional login/registration system
- ✅ Secure authentication
- ✅ Password management
- ✅ Admin tools
- ✅ Role-based access
- ✅ Production-ready code
- ✅ Complete documentation

**Start with:** `node admin-reset.js` then run both servers!

---

**Built with ❤️ for schools using MERN Stack**

---

## 🗂️ Quick Links

| Document | Purpose |
|----------|---------|
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | One-page quick reference |
| [MERN_SETUP_CHECKLIST.md](./MERN_SETUP_CHECKLIST.md) | Step-by-step checklist |
| [MERN_SETUP_GUIDE.md](./MERN_SETUP_GUIDE.md) | Complete setup guide |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Technical summary |

---

**Questions? Start with the documentation files or run `node admin-reset.js`!** 🚀
