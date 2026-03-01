const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subject: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    attendance: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    teacherEmail: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Marks", marksSchema);
