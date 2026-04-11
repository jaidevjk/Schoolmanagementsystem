#!/usr/bin/env node

/**
 * ADMIN PASSWORD RESET SCRIPT
 * For school-mern-app/server
 * 
 * This script helps you reset the admin password directly.
 * Run from the server directory: node admin-reset.js
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// Import the User model (adjust path as needed)
import('../models/User.js').then(({ default: User }) => {
    resetAdminPassword(User);
}).catch(err => {
    console.error('Error importing User model:', err.message);
    process.exit(1);
});

async function resetAdminPassword(User) {
    try {
        // Connect to MongoDB
        console.log('🔄 Connecting to database...');
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/school';

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to database');

        const ADMIN_EMAIL = 'admin@school.com';
        const NEW_PASSWORD = 'Admin123456'; // Change this!

        // Check if admin exists
        console.log(`\n🔍 Looking for admin with email: ${ADMIN_EMAIL}`);
        let admin = await User.findOne({ email: ADMIN_EMAIL, role: 'admin' });

        if (!admin) {
            // Create new admin if doesn't exist
            console.log('⚠️  Admin not found. Creating new admin account...\n');

            admin = new User({
                name: 'School Administrator',
                email: ADMIN_EMAIL,
                password: NEW_PASSWORD,
                role: 'admin',
            });

            await admin.save();
            console.log('✅ New admin account created!');
        } else {
            // Update existing admin password
            console.log(`✅ Admin found: ${admin.name}`);
            console.log('🔄 Updating password...\n');

            admin.password = NEW_PASSWORD;
            await admin.save();
            console.log('✅ Password updated!');
        }

        // Display credentials
        console.log('\n' + '='.repeat(50));
        console.log('📋 ADMIN CREDENTIALS:');
        console.log('='.repeat(50));
        console.log(`Email:    ${ADMIN_EMAIL}`);
        console.log(`Password: ${NEW_PASSWORD}`);
        console.log('='.repeat(50));
        console.log('\n✨ You can now login with these credentials!');
        console.log('🔐 IMPORTANT: Change this password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.log('\n📝 Troubleshooting:');
        console.log('1. Make sure MongoDB is running');
        console.log('2. Check MONGO_URI in .env file');
        console.log('3. Ensure User model exists in models/User.js');
        console.log('4. Check internet connection if using MongoDB Atlas');
        process.exit(1);
    }
}
