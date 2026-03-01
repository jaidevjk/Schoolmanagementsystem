const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ["SuperAdmin", "Admin", "Teacher"]
    },
    subject: { type: String, required: false }
});

module.exports = mongoose.model("Admin", AdminUserSchema);