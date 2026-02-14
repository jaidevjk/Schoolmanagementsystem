const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

const { verifyTokenAndSuperAdmin, verifyTokenAndAdmin } = require("../middlewares/auth");

router.post("/", verifyTokenAndSuperAdmin, adminController.createUser); // Only SuperAdmin can create new Admin/Teacher
router.post("/login", adminController.loginUser); // Public
router.get("/teachers", verifyTokenAndAdmin, adminController.listTeachers); // Admin/SuperAdmin can view teachers

module.exports = router;