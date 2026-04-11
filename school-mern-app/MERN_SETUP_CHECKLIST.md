# ✅ MERN App Quick Setup Checklist

## Your Action Items:

### 🔴 STEP 1: Reset Admin Password (DO THIS FIRST!)
```bash
cd school-mern-app/server
node admin-reset.js
```

- [ ] Run command successfully
- [ ] See "✅ Admin found" or "✅ New admin account created"
- [ ] Copy admin credentials:
  - Email: `admin@school.com`
  - Password: `Admin123456` (or whatever is shown)
- [ ] Keep credentials safe

---

### 🟡 STEP 2: Start Backend
```bash
# From school-mern-app/server
npm start
```

- [ ] Backend starts without errors
- [ ] See "✅ Server running" message
- [ ] Port is 5000 (or check your config)
- [ ] MongoDB connected

---

### 🟡 STEP 3: Start Frontend
```bash
# From school-mern-app/client
npm start
```

- [ ] Frontend starts without errors
- [ ] App opens in browser (usually http://localhost:5173)
- [ ] See login page

---

### 🟡 STEP 4: Test Login
- [ ] Open login page
- [ ] Enter admin credentials from Step 1
- [ ] Click "Sign in"
- [ ] Should redirect to dashboard
- [ ] Admin dashboard loads successfully

---

### 🟡 STEP 5: Test Registration
- [ ] Click "Create New Account" button
- [ ] Fill in form:
  - [ ] Name
  - [ ] Email (new email)
  - [ ] Password (min 6 chars)
  - [ ] Confirm Password
  - [ ] Role (Student or Teacher)
- [ ] Click "Create Account"
- [ ] See success message
- [ ] Redirected to login
- [ ] Try login with new account
- [ ] Should work! ✅

---

### 🟡 STEP 6: Test Password Reset
- [ ] Go back to login page
- [ ] Click "Reset Password" button
- [ ] See password reset page
- [ ] (Optional) Test reset request:
  - [ ] Enter email
  - [ ] Enter reason
  - [ ] Submit request
  - [ ] Should see success message

---

### 🟢 STEP 7: Share with Team
- [ ] Create user accounts for teammates
- [ ] Build student/teacher data
- [ ] Set up classes and subjects
- [ ] Configure attendance/marks system
- [ ] Test all features

---

## 📋 Files You Received

**In `school-mern-app/` folder:**

1. **client/src/pages/Login.jsx** (Updated)
   - ✓ Now has "Create New Account" link
   - ✓ Has "Reset Password" link

2. **client/src/pages/Register.jsx** (NEW)
   - ✓ Complete registration component
   - ✓ Form validation
   - ✓ Student/Teacher role selection

3. **client/src/App.jsx** (Updated)
   - ✓ Added `/register` route
   - ✓ Added `/password-reset` route
   - ✓ Register component imported

4. **server/admin-reset.js** (NEW)
   - ✓ One-command admin reset
   - ✓ Creates admin if missing

5. **server/MONGODB_ADMIN_RESET.js** (NEW)
   - ✓ Manual MongoDB reset guide
   - ✓ Reference for database direct access

6. **MERN_SETUP_GUIDE.md** (NEW)
   - ✓ Detailed setup instructions

---

## 🎯 Expected Flow

```
1. User goes to http://localhost:5173
   ↓
2. Sees login page with links:
   - "Create New Account" → /register
   - "Reset Password" → /password-reset
   ↓
3. Can login, register, or request password reset
   ↓
4. Admin can approve password requests
   ↓
5. Users access their respective dashboards
```

---

## ❌ Common Issues - QUICK FIX

**"Server error. Is backend running?"**
- Stop and restart: `npm start` in server folder
- Check port 5000 is available

**"Cannot read property 'email' of undefined"**
- Make sure backend is fully running
- Refresh browser

**Registration says "Failed"**
- Check backend console for detailed error
- Verify MongoDB is connected

**Admin credentials not working**
- Run `node admin-reset.js` again
- Maybe default credentials were different
- Check server/LOGIN_CREDENTIALS.txt for original creds

---

## 🔐 Security Notes

⚠️ **Important:**
1. Change admin password after first login
2. Use strong passwords (8+ characters)
3. Don't share admin credentials
4. Keep `.env` file secure
5. Never commit `.env` to Git

---

## 💬 Need Help?

1. Read `MERN_SETUP_GUIDE.md` for detailed steps
2. Check `server/admin-reset.js` for auto-reset details
3. Review `server/MONGODB_ADMIN_RESET.js` for manual reset
4. Check your `.env` file configuration
5. Verify MongoDB is running and accessible

---

## ✨ You're All Set!

After completing all steps, your MERN app will have:
- ✅ Professional login page
- ✅ User registration system
- ✅ Password reset workflow
- ✅ Admin management
- ✅ Role-based access
- ✅ Ready for production!

**Next: Customize and deploy!** 🚀
