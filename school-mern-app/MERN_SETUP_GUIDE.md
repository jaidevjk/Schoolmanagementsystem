# 🎯 School MERN App - Login & Registration Setup Guide

## What's New

Your school management MERN app now has complete login, registration, and password reset functionality:

### ✅ Updated Components:

1. **Login Page** (`client/src/pages/Login.jsx`)
   - Added "Create New Account" button
   - Added "Reset Password" button
   - Professional styling

2. **Register Component** (`client/src/pages/Register.jsx`) - NEW
   - Full registration form
   - Form validation
   - Student & Teacher role selection
   - Integrated with backend API

3. **App Routes** (`client/src/App.jsx`) - UPDATED
   - Added `/register` route
   - Added `/password-reset` route (public access)
   - Register component imported and configured

4. **Admin Reset Script** (`server/admin-reset.js`) - NEW
   - Automatic admin password reset
   - Creates admin if doesn't exist
   - Easy one-command setup

5. **MongoDB Reset Guide** (`server/MONGODB_ADMIN_RESET.js`) - NEW
   - Manual database reset instructions
   - Step-by-step MongoDB commands
   - For advanced users/troubleshooting

---

## 🚀 Quick Start

### Step 1: Reset Admin Password (DO THIS FIRST!)

**From the server directory:**
```bash
cd school-mern-app/server
node admin-reset.js
```

**Expected output:**
```
✅ Connected to database
✅ Admin found: School Administrator
✅ Password updated!
==================================================
📋 ADMIN CREDENTIALS:
==================================================
Email:    admin@school.com
Password: Admin123456
==================================================
✨ You can now login with these credentials!
```

### Step 2: Start the Backend
```bash
# From school-mern-app/server
npm start
# or
npm run dev
```

Should see: `✅ Server running on http://localhost:5000`

### Step 3: Start the Frontend
```bash
# From school-mern-app/client  
npm start
# or
npm run dev
```

Should see: App opens at `http://localhost:5173` (or similar)

### Step 4: Test Login
1. Go to login page
2. Enter admin credentials from Step 1
3. Should redirect to dashboard ✅

---

## 📋 User Flows

### New User Registration:
1. Click "Create New Account" on login page
2. Fill: Name, Email, Password, Role (Student/Teacher)
3. Click "Create Account"
4. Redirected to login page
5. Login with new credentials

### Forgot Password:
1. Click "Reset Password" on login page
2. Fill: Email and reason for reset
3. Admin reviews request in dashboard
4. Admin approves → User gets notification
5. User can reset password

---

## 📁 Files Changed/Created:

```
✅ client/src/pages/Login.jsx              (Updated - added links)
✅ client/src/pages/Register.jsx           (Created - new registration)
✅ client/src/App.jsx                      (Updated - added routes)
✅ server/admin-reset.js                   (Created - admin reset script)
✅ server/MONGODB_ADMIN_RESET.js           (Created - manual reset guide)
✅ MERN_SETUP_GUIDE.md                     (This file)
```

---

## 🔐 Admin Credentials

After running `node admin-reset.js`:

| Field | Value |
|-------|-------|
| Email | admin@school.com |
| Password | Admin123456 |

**⚠️ Important:**
- Change password after first login!
- Keep credentials secure
- Don't share with unauthorized users

---

## 🆘 Troubleshooting

### "Server error. Is backend running?"
- Make sure backend is running: `npm start` (in server folder)
- Check port is correct (usually 5000)
- Verify `.env` file has correct `MONGO_URI`

### "Cannot find module" error
- Run `npm install` in both server and client folders
- Make sure Node.js v14+ is installed

### Admin credentials not working
- Run `node admin-reset.js` again
- Check backend is actually running
- Verify MongoDB connection

### Password reset not appearing
- Make sure you're logged in as admin
- Check admin dashboard for "Password Requests" section
- Backend password-reset routes must be configured

---

## 🎯 Default Test Credentials

After setup, try these:
```
Admin:
Email: admin@school.com
Password: Admin123456

Teacher:
Email: teacher1@school.com
Password: teacher123

Student:
Email: student1@school.com
Password: student123
```

---

## ✨ API Endpoints Used

These endpoints should already exist in your backend:

```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user
POST   /api/password-reset/request      - Request password reset
GET    /api/password-reset/pending      - Get pending requests (admin)
PUT    /api/password-reset/:id/approve  - Approve reset request
POST   /api/password-reset/reset-password - Set new password
```

---

## 🔧 Environment Setup

**Make sure your `.env` file in server folder has:**

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/school_db
# or for MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/school_db

# JWT
JWT_SECRET=your_secret_key

# Port
PORT=5000

# Node environment
NODE_ENV=development
```

---

## 📝 Next Steps

1. ✅ Run admin reset script
2. ✅ Start backend and frontend
3. ✅ Test login with admin credentials
4. ✅ Test registration with new user
5. ✅ Customize default admin password
6. ✅ Configure email notifications (optional)
7. ✅ Share login page with teammates

---

## 💡 Pro Tips

1. **Bookmark the paths:**
   - Login: `http://localhost:5173/login`
   - Register: `http://localhost:5173/register`
   - Password Reset: `http://localhost:5173/password-reset`

2. **Change admin password immediately after first login**

3. **Test registration with different roles (Student/Teacher)**

4. **Monitor password reset requests regularly as admin**

5. **Keep `.env` file secure - never commit to git**

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| Cannot register | Check backend is running on port 5000 |
| Registration button not responding | Check browser console for errors |
| Admin dashboard not loading | Verify you're logged in as admin |
| Password reset requests not showing | Check admin role permissions |

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running (usually port 5173)
- [ ] MongoDBconnected
- [ ] Admin credentials working
- [ ] Can create new account
- [ ] Can login with new account
- [ ] Password reset flow working
- [ ] Admin dashboard accessible

---

## 🎓 You're Ready!

Your MERN app now has:
- ✅ Professional login page
- ✅ User registration system
- ✅ Password reset workflow
- ✅ Admin management tools
- ✅ Role-based access (Admin/Teacher/Student)

**Start using it and customize as needed!** 🚀
