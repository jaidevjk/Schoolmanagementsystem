// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const bcrypt = require("bcrypt");
//  const multer = require('multer');
//     // const mongoose = require('mongoose'),
//     const uuidv4 = require('uuid');
//     var fs = require('fs');


// //Course Model
// const User = require('../models/users');


// // const DIR = '../public/images';
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, DIR);
// //     },
// //     filename: (req, file, cb) => {
// //         const fileName = file.originalname.toLowerCase().split(' ').join('-');
// //         cb(null, uuidv4() + '-' + fileName)
// //     }
// // });
// // var upload = multer({
// //     storage: storage,
// //     fileFilter: (req, file, cb) => {
// //         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
// //             cb(null, true);
// //         } else {
// //             cb(null, false);
// //             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
// //         }
// //     }
// // });
 
// // var Upload =  upload.single('image');

// exports.createUser =(req,res) => {
    

//     const newUser = new User({
//     name: req.body.name?.toLowerCase(),
//     parentName: req.body.parentName?.toLowerCase(),
//     phonenumber: req.body.phonenumber,
//     email: req.body.email?.toLowerCase(),
//     dob: req.body.dob,
//     gender: req.body.gender?.toLowerCase(),
//     address: req.body.address?.toLowerCase(),
//     grade: req.body.grade,
//     Description: req.body.Description || []
// });

//     newUser.save((error)=>{
//         if(error)
//         {
//             res.json({status:0,debug_data:error});
//         }
//         else{
//             { id: newUser._id }
//             res.json({
//                                     newUser: {
//                                         id: newUser._id,
//                                         name: newUser.name,
//                                         email: newUser.email
//                                     }
//                                 });
//             // res.json({status:1,data:"newUser created"}
//             //     );
//             console.log(res.data);
//         }
//     })
// }


// exports.loginUser = async (req, res) => {

// //

// const { phonenumber } = req.body;
//     // if(!email || !password){
//     //     res.status(400).json({msg: 'Please enter all fields'});
//     // }
//     // User.findOne({phonenumber}
//     //     , function (user) {
//     //     if (!user) {
//     //         console.log("user exists");
//     //         return res.redirect('/login'); // main page url
//     //     }
//     //     else {
//     //         console.log("no exist");
//     //       return  res.redirect('/login');
//     //     }
//     // })
//         User.findOne({phonenumber}).then(user => {
//             if(!user) { 
                
//                 res.status(400).json({msg: 'User does not exist'});
                
                
//             } else{
//                                 { id: user._id }
//                                res.json({
                               
//                                 user: {
//                                     user_id: user._id,
//                                     name: user.name,
//                                     phonenumber: user.phonenumber,
//                                     id_type:user.id_type,
//                                     id_number:user.id_number,
//                                     email:user.email
//                                         }
//                                     }); 
//                                }

                               
                                
                            
                            
                        
                    
                
//         })

// };


// exports.listUsers = (request, response) => {
//     User.find(function(err, users_list) {
//         if(err){
//             response.json(err);
//         } else {
//             // console.log("one:",users_list);
//             response.json({status: 1, data: users_list});

//         }
//     });
// };


// exports.userformController = function(request,response){

//     let completePath = path.join(__dirname+"/../user.html");
//     response.sendFile(completePath);
// }

// exports.DeleteUsers = (request, response) => {
//     User.delete(function(err, users_list) {
//         if(err){
//             response.json(err);
//         } else {
//             console.log("one:",users_list);
//             response.json({status: 1, data: users_list});

//         }
//     });
// };

const path = require('path');
const User = require('../models/users');


// ===============================
// CREATE USER (New Application)
// ===============================
exports.createUser = async (req, res) => {
    try {

        const newUser = new User({
            name: req.body.name?.toLowerCase(),
            parentName: req.body.parentName?.toLowerCase(),
            phonenumber: req.body.phonenumber,
            email: req.body.email?.toLowerCase(),
            dob: req.body.dob,
            gender: req.body.gender?.toLowerCase(),
            address: req.body.address?.toLowerCase(),
            grade: req.body.grade,
            Description: req.body.Description || []
        });

        const savedUser = await newUser.save();

        res.json({
            status: 1,
            message: "User created successfully",
            data: savedUser
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "Error creating user",
            error: error.message
        });
    }
};



// ===============================
// LOGIN USER
// ===============================
exports.loginUser = async (req, res) => {
    try {

        const { phonenumber } = req.body;

        const user = await User.findOne({ phonenumber });

        if (!user) {
            return res.status(400).json({
                status: 0,
                message: "User does not exist"
            });
        }

        res.json({
            status: 1,
            user: {
                user_id: user._id,
                name: user.name,
                phonenumber: user.phonenumber,
                email: user.email,
                AdmissionStatus: user.AdmissionStatus
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            error: error.message
        });
    }
};



// ===============================
// LIST ALL USERS
// ===============================
exports.listUsers = async (req, res) => {
    try {

        const users = await User.find().sort({ createdAt: -1 });

        res.json({
            status: 1,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            error: error.message
        });
    }
};



// ===============================
// APPROVE STUDENT
// ===============================
exports.approveStudent = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                Approved: true,
                AdmissionStatus: "Yet to be Admitted"
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: 0,
                message: "User not found"
            });
        }

        res.json({
            status: 1,
            message: "Student Approved Successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            error: error.message
        });
    }
};



// ===============================
// ADMIT STUDENT
// ===============================
exports.admitStudent = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                AdmissionStatus: "Admitted",
                admittedAt: new Date()
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: 0,
                message: "User not found"
            });
        }

        res.json({
            status: 1,
            message: "Student Admitted Successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            error: error.message
        });
    }
};



// ===============================
// MARK AS OLD STUDENT
// ===============================
exports.markOldStudent = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                isOldStudent: true,
                Approved: true,
                AdmissionStatus: "Admitted",
                admittedAt: new Date()
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: 0,
                message: "User not found"
            });
        }

        res.json({
            status: 1,
            message: "Marked as Old Student",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            error: error.message
        });
    }
};



// ===============================
// DELETE SINGLE USER
// ===============================
exports.deleteUser = async (req, res) => {
    try {

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                status: 0,
                message: "User not found"
            });
        }

        res.json({
            status: 1,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            error: error.message
        });
    }
};



// ===============================
// USER FORM PAGE
// ===============================
exports.userformController = function(req, res) {
    let completePath = path.join(__dirname + "/../user.html");
    res.sendFile(completePath);
};
