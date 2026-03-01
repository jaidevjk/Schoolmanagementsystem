const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ["SuperAdmin", "Admin", "Teacher", "Student"] // Strict roles
    },
    permissions: {
        type: [String], // Array of permission strings e.g., "create_user", "view_marks"
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Master", masterSchema);
