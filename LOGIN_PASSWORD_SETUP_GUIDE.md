# Login & Password Reset Guide

## ✅ What's Been Updated

### 1. **Login Page** (`login.html`)
- Added **"Create New Account"** link
- Added **"Reset Password"** link
- Clean, professional styling matching your dashboard theme

### 2. **Registration Page** (`register.html`)
- Improved UI with better styling
- Now matches login page design
- Supports Student and Teacher registration
- Includes validation for all fields

### 3. **Forgot Password Page** (`forgot-password.html`)
- New dedicated password reset request page
- Users submit their email and reason for password reset
- Requests are reviewed by administrators
- Once approved, users can set a new password

---

## 🔐 Password Reset Flow

### For Regular Users (Teachers/Students):

1. **Request Reset**: User clicks "Reset Password" → Fills email & reason → Submits request
2. **Admin Reviews**: Admin sees pending requests in dashboard
3. **Admin Approves**: Admin approves the request
4. **User Resets**: User can now set new password

### Backend Endpoints (Already Configured):
- `POST /api/password-reset/request` - Submit reset request
- `GET /api/password-reset/pending` - View pending requests (Admin)
- `PUT /api/password-reset/:requestId/approve` - Approve request
- `POST /api/password-reset/reset-password` - Set new password

---

## 🛠️ Admin Password Recovery (For You!)

Since you don't know the admin password, here are the solutions:

### **Option 1: Direct Database Reset** ⭐ RECOMMENDED
Edit the admin user directly in your database:

```javascript
// MongoDB command (in mongosh or MongoDB Compass)
db.admins.updateOne(
  { email: "your-admin-email@example.com" },
  { $set: { password: "hashedPasswordHere" } }
)

// Or for users collection:
db.users.updateOne(
  { email: "your-admin-email@example.com" },
  { $set: { password: "hashedPasswordHere" } }
)
```

### **Option 2: Create Backend Reset Endpoint**
Create a temporary admin reset endpoint (remove after use):

```javascript
// Add to backend/routes/admin.js
app.post('/admin/emergency-reset', async (req, res) => {
  const { email, newPassword } = req.body;
  
  if(!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be 6+ characters" });
  }
  
  try {
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    const admin = await Admin.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    
    if(!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Password reset successfully" });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});
```

Then call it:
```bash
curl -X POST http://localhost:4003/admin/emergency-reset \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","newPassword":"NewPassword123"}'
```

### **Option 3: Reset via Database UI**
If using MongoDB Compass or similar:
1. Open your database
2. Find your admin collection
3. Find the admin document by email
4. Manually hash a new password and update
5. Use this password to login

---

## 🔑 Default Credentials (Check These First)

Common default credentials for school management systems:

| Email | Password |
|-------|----------|
| admin@school.com | admin123 |
| admin@school.com | password123 |
| admin@admin.com | admin |

Try these first before resetting!

---

## 📋 How to Set Up Initial Admin Account

If admin doesn't exist, add one directly:

```javascript
// MongoDB command
db.admins.insertOne({
  email: "admin@school.com",
  name: "Administrator",
  password: "hashed-password-here",
  role: "admin",
  createdAt: new Date()
})
```

Or use the registration endpoint if it allows admin registration:
```bash
POST http://localhost:4003/admin/register
{
  "name": "Administrator",
  "email": "admin@school.com",
  "password": "SecurePassword123",
  "role": "admin"
}
```

---

## 🚀 Quick Steps to Get Started

1. **Try Default Credentials**: Login with `admin@school.com` / `admin123`
2. **If Failed**: Use Option 2 (create emergency reset endpoint)
3. **Access Admin Dashboard**: Go to `admin-dashboard.html`
4. **Manage Users**: Create new teachers and students from admin panel
5. **Handle Reset Requests**: Review pending password reset requests

---

## ✨ New User Flows

### New User Registration:
1. User goes to login page
2. Clicks "Create New Account"
3. Fills in: Name, Email, Password, Role (Student/Teacher)
4. Account created successfully
5. User can login

### Forgot Password:
1. User clicks "Reset Password" on login page
2. Enters email and reason for reset
3. Request submitted to admin
4. Admin reviews and approves from dashboard
5. User receives notification and can set new password

---

## 📝 Important Notes

- All password reset requests require admin approval (for security)
- Passwords are encrypted in database
- Teachers/Students can request resets, only within approval workflow
- Admin has authority to approve/reject requests with reasons

---

## ❓ Troubleshooting

**Q: "Server error. Is backend running?"**
- Make sure backend is running on port 4003
- Check `backend/config/config.env` for correct port

**Q: Reset request not showing for admin**
- Check admin dashboard for "Password Requests" section
- Ensure admin is logged in with proper role

**Q: Want to bypass approval workflow temporarily?**
- Create direct password update endpoint (Option 2 above)
- Remember to remove it for production for security!

---

## 🔒 Security Recommendations

1. ✅ Change default admin password after setup
2. ✅ Use strong passwords (8+ characters, mix of numbers/symbols)
3. ✅ Never share admin credentials
4. ✅ Regularly review password reset requests
5. ✅ Remove emergency reset endpoints before deployment
