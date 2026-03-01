// var express = require('express');
// var router = express.Router();
// var usersController = require('../controller/usersController')

// /* GET users listing. */

// // router.get('/', usersController.listUsers);

// // router.post("/",usersController.createUser);
// // router.post("/userlogin",usersController.loginUser);
// // router.post("/userform",usersController.userformController );
// router.get('/', usersController.listUsers);
// router.post("/",usersController.createUser);
// router.post("/userlogin",usersController.loginUser);

// router.put("/approve/:id", usersController.approveStudent);
// router.put("/admit/:id", usersController.admitStudent);
// router.put("/mark-old/:id", usersController.markOldStudent);


// module.exports = router;


const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');


// ======================================
// GET ALL USERS
// ======================================
const { verifyTokenAndAdmin, verifyTokenAndTeacher, verifyTokenAndSuperAdmin, verifyToken } = require("../middlewares/auth");

// ======================================
// GET ALL USERS
// ======================================
router.get('/', verifyTokenAndTeacher, usersController.listUsers); // Teacher/Admin/SuperAdmin

// ======================================
// GET SINGLE USER
// ======================================
router.get('/:id', verifyTokenAndTeacher, usersController.getUser); // Teacher/Admin/SuperAdmin

// ======================================
// CREATE NEW USER (Application Form)
// ======================================
router.post('/', usersController.createUser); // Public (Admission Form)


// ======================================
// USER LOGIN
// ======================================
router.post('/userlogin', usersController.loginUser); // Public


// ======================================
// APPROVE STUDENT
// ======================================
router.put('/approve/:id', verifyTokenAndAdmin, usersController.approveStudent); // Admin/SuperAdmin


// ======================================
// ADMIT STUDENT
// ======================================
router.put('/admit/:id', verifyTokenAndAdmin, usersController.admitStudent); // Admin/SuperAdmin


// ======================================
// MARK AS OLD STUDENT
// ======================================
router.put('/mark-old/:id', verifyTokenAndAdmin, usersController.markOldStudent); // Admin/SuperAdmin


// ======================================
// UPDATE USER (Teacher can update students)
// ======================================
router.put('/:id', verifyTokenAndTeacher, usersController.updateUser); // Teacher/Admin/SuperAdmin


// ======================================
// DELETE USER
// ======================================
router.delete('/:id', verifyTokenAndTeacher, usersController.deleteUser); // Teacher/Admin/SuperAdmin


// ======================================
// USER FORM PAGE
// ======================================
router.get('/userform', usersController.userformController);


module.exports = router;
