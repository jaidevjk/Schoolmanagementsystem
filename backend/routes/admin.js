const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

const { verifyTokenAndSuperAdmin, verifyTokenAndAdmin } = require("../middlewares/auth");

//Below are the routes for admin functionalities. The createUser route is protected and can only be accessed by SuperAdmin, while the login route is public. The listTeachers route can be accessed by both Admin and SuperAdmin to view the list of teachers.

// ======================================
// CREATE TEACHER
// ======================================
router.post("/", adminController.createUser); // Create Teacher/Admin

// ======================================
// LOGIN
// ======================================
router.post("/login", adminController.loginUser); // Public

// ======================================
// LIST ALL TEACHERS
// ======================================
router.get("/teachers", adminController.listTeachers); // Admin/SuperAdmin can view teachers

// ======================================
// GET SINGLE TEACHER
// ======================================
router.get("/teachers/:id", verifyTokenAndAdmin, adminController.getTeacher); // Admin/SuperAdmin

// ======================================
// UPDATE TEACHER
// ======================================
router.put("/teachers/:id", verifyTokenAndAdmin, adminController.updateTeacher); // Admin/SuperAdmin

// ======================================
// DELETE TEACHER
// ======================================
router.delete("/teachers/:id", verifyTokenAndAdmin, adminController.deleteTeacher); // Admin/SuperAdmin

module.exports = router;