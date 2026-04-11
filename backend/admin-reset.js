#!/usr/bin/env node

/**
 * ADMIN PASSWORD RESET SCRIPT
 * 
 * This script helps you reset the admin password directly.
 * Run from the backend directory: node admin-reset.js
 */

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Admin = require("./models/admin");
require("dotenv").config({ path: "./config/config.env" });

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/school";
const ADMIN_EMAIL = "admin@school.com";
const NEW_PASSWORD = "Admin123456"; // Change this!

async function resetAdminPassword() {
    try {
        // Connect to MongoDB
        console.log("🔄 Connecting to database...");
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to database");

        // Check if admin exists
        console.log(`\n🔍 Looking for admin with email: ${ADMIN_EMAIL}`);
        let admin = await Admin.findOne({ email: ADMIN_EMAIL });

        if (!admin) {
            // Create new admin if doesn't exist
            console.log("⚠️  Admin not found. Creating new admin account...\n");

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);

            admin = new Admin({
                email: ADMIN_EMAIL,
                password: hashedPassword,
                name: "School Administrator",
                role: "admin",
            });

            await admin.save();
            console.log("✅ New admin account created!");
        } else {
            // Update existing admin password
            console.log(`✅ Admin found: ${admin.name}`);
            console.log("🔄 Updating password...\n");

            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(NEW_PASSWORD, salt);
            await admin.save();
            console.log("✅ Password updated!");
        }

        // Display credentials
        console.log("\n" + "=".repeat(50));
        console.log("📋 ADMIN CREDENTIALS:");
        console.log("=".repeat(50));
        console.log(`Email:    ${ADMIN_EMAIL}`);
        console.log(`Password: ${NEW_PASSWORD}`);
        console.log("=".repeat(50));
        console.log("\n✨ You can now login with these credentials!");
        console.log("🔐 IMPORTANT: Change this password after first login!");

        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error:", error.message);
        console.log("\n📝 Troubleshooting:");
        console.log("1. Make sure MongoDB is running");
        console.log("2. Check MONGODB_URL in config/config.env");
        console.log("3. Ensure admin model exists");
        process.exit(1);
    }
}

// Run the script
resetAdminPassword();
