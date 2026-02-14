// const mongoose  = require('mongoose');


// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     phonenumber: {
//         type: Number,
//         require: true
//     },
//     parentName:{
//         type: String,
//         require: true
//     },
//     email: {
//         type: String,
//         require: true
//     },
//     dob: {
//         type: Date,
//         require: true
//     },
//     gender: {
//         type: String,
//         require: true
//     },

//     address: {
//         type: String,
//         require: true
//     },
//     grade:{
//         type: String,
//         require: true
//     },
//    Description: {
//     type: [mongoose.Schema.Types.Mixed],
//     default: []
// },
// Approved: {
//     type: Boolean,
//     default: false
// },
// AdmissionStatus:{
//     type: String,
//     require: true
// }
    
// },
// {
//     timestamps: true
// });


// module.exports =mongoose.model('User', UserSchema);


//  // image:
//  //    {
//  //        data: Buffer,
//  //        contentType: String
//  //    }

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    parentName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },

    Description: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    },

    // Step 1: Admin Approval
    Approved: {
        type: Boolean,
        default: false
    },

    // Step 2: Admission Process Status
    AdmissionStatus:{
        type: String,
        enum: ["Pending", "Yet to be Admitted", "Admitted"],
        default: "Pending"
    },

    // Step 3: Capture when admitted
    admittedAt: {
        type: Date,
        default: null
    },

    // To differentiate old students
    isOldStudent: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
