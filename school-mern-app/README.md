# V Blooms D World School - MERN Stack

A fullstack MERN (MongoDB, Express, React, Node.js) website and management portal for **V Blooms D World School**, focused on admissions and three user roles: **Admin**, **Teacher**, and **Student**.

## Website (public, no login)

- **Landing**: Home page with hero, highlights, admissions CTA, and gallery preview
- **About Us**, **Academics**, **Admissions**, **Gallery**, **Contact** — same content and style as the frontend HTML pages
- **Navbar**: Home, About Us, Academics, Admissions, Gallery, Contact, **Login**
- **Login** in the navbar takes users to the login page; after login they are redirected to their **role-based dashboard**

## Portal (after login)

- **Admin**: Dashboard, Students, Teachers, Classes, Subjects, Attendance, Marks
- **Teacher**: Dashboard, Mark Attendance, Marks
- **Student**: Dashboard, My Attendance, My Marks

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas). The app uses the same MongoDB connection pattern as your main backend. Default: `mongodb://127.0.0.1:27017/school_mern`

## Quick Start

### 1. MongoDB

Ensure MongoDB is running. To use your existing backend URI, edit `server/.env` and set:

```env
MONGO_URI=mongodb://127.0.0.1:27017/school_mern
```

Or use your backend's URI (e.g. from `backend/app.js` or `backend/config`) and change the database name to `school_mern` to keep data separate.

### 2. Backend (API)

```bash
cd school-mern-app/server
npm install
npm run seed
npm start
```

- API runs at **http://localhost:5001**
- Seed creates sample Admin, Teachers, and Students and sample data.

### 3. Frontend (React)

```bash
cd school-mern-app/client
npm install
npm run dev
```

- App runs at **http://localhost:3000**
- Vite proxies `/api` to the backend (port 5001).

## Sample Logins (after seed)

| Role    | Email               | Password   |
|---------|---------------------|------------|
| Admin   | admin@school.com    | admin123   |
| Teacher | teacher1@school.com | teacher123 |
| Teacher | teacher2@school.com | teacher123 |
| Student | student1@school.com | student123 |
| Student | student2@school.com | student123 |
| Student | student3@school.com | student123 |

## Photos

The app expects images in `client/public/photos/` (e.g. `school image.JPG`, `gallery 1.JPG`, logo). Copy the image files from your main project’s `photos` folder into `school-mern-app/client/public/photos/`. If a logo image is missing, the header shows “VB” as a fallback.

## Project Structure

```
school-mern-app/
├── server/                 # Express API
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/auth.js
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── client/                 # React (Vite)
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Overview

- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user (protected)
- `GET/POST/PUT/DELETE /api/students` - Students (admin/teacher read, admin write)
- `GET/POST/PUT/DELETE /api/teachers` - Teachers (admin)
- `GET/POST/PUT/DELETE /api/classes` - Classes
- `GET/POST/PUT/DELETE /api/subjects` - Subjects
- `GET/POST /api/attendance`, `POST /api/attendance/bulk` - Attendance
- `GET/POST/PUT/DELETE /api/marks` - Marks

## Deployment

- **Backend**: Set `MONGO_URI`, `JWT_SECRET`, and `PORT` in production; run `node server.js`.
- **Frontend**: Run `npm run build` in `client`, then serve the `client/dist` folder (e.g. with Express static or any static host).
- Ensure the frontend can call the API (same origin or CORS and correct API URL).
