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
router.get('/', usersController.listUsers);


// ======================================
// CREATE NEW USER (Application Form)
// ======================================
router.post('/', usersController.createUser);


// ======================================
// USER LOGIN
// ======================================
router.post('/userlogin', usersController.loginUser);


// ======================================
// APPROVE STUDENT
// ======================================
router.put('/approve/:id', usersController.approveStudent);


// ======================================
// ADMIT STUDENT
// ======================================
router.put('/admit/:id', usersController.admitStudent);


// ======================================
// MARK AS OLD STUDENT
// ======================================
router.put('/mark-old/:id', usersController.markOldStudent);


// ======================================
// DELETE USER
// ======================================
router.delete('/:id', usersController.deleteUser);


// ======================================
// USER FORM PAGE
// ======================================
router.get('/userform', usersController.userformController);


module.exports = router;
