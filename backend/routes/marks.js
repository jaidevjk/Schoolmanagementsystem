const express = require("express");
const router = express.Router();
const marksController = require("../controller/marksController");
const { verifyTokenAndTeacher, verifyToken } = require("../middlewares/auth");

// ========================================
// Add/Update Marks (Teacher only)
// ========================================
router.post("/add-marks", verifyTokenAndTeacher, marksController.addMarks);

// ========================================
// Get Marks for a specific student (Teacher)
// ========================================
router.get("/student", verifyTokenAndTeacher, marksController.getMarks);

// ========================================
// Get your own marks (Student)
// ========================================
router.get("/my-marks", verifyToken, marksController.getStudentMarks);

module.exports = router;
