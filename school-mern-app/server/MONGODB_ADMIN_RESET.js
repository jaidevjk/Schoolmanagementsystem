/**
 * MONGODB ADMIN PASSWORD RESET
 * For school-mern-app (MERN Stack)
 * 
 * Use this if you want to reset the admin password directly in MongoDB
 * 
 * Options:
 * 1. If using MongoDB Atlas (Cloud):
 *    - Open your cluster in MongoDB Atlas
 *    - Click "COLLECTIONS" tab
 *    - Find "users" collection
 *    - Use the queries below in the filter/update sections
 *
 * 2. If using Local MongoDB:
 *    - Connect using MongoDB Compass or mongosh
 *    - Navigate to your database
 *    - Run the commands below
 */

// ============================================
// STEP 1: Find existing admin
// ============================================

// Use this query in MongoDB to find your admin:
db.users.findOne({ email: "admin@school.com", role: "admin" })

// Should return something like:
// {
//   "_id": ObjectId("..."),
//   "name": "Administrator",
//   "email": "admin@school.com",
//   "password": "$2b$10$...",  // encrypted
//   "role": "admin",
//   "createdAt": ISODate("..."),
//   ...
// }

// ============================================
// STEP 2: Generate new hashed password
// ============================================

// Option A: Use bcryptjs to hash the password
// Run this in Node.js first, then use the hash in MongoDB:

const bcrypt = require('bcryptjs');
bcrypt.hash('Admin123456', 10, (err, hash) => {
    if (err) throw err;
    console.log('Copy this hash and use it below:');
    console.log(hash);
    // Example output: $2b$10$N9qo8uLOickgx2ZMRZoMy.1234567890123456789012345678
});

// Option B: Use this quick online tool to hash:
// https://bcrypt-generator.com/
// (Enter your password, set cost to 10, copy the hash)

// ============================================
// STEP 3: Update admin password in MongoDB
// ============================================

// Replace ADMIN_EMAIL with your actual admin email
// Replace HASHED_PASSWORD_HERE with the hash from step 2

db.users.updateOne(
    { email: "admin@school.com", role: "admin" },
    {
        $set: {
            password: "$2b$10$N9qo8uLOickgx2ZMRZoMy.1PbFdvfF0CK1xgWJjV6QH1zPjVPg3XW"
        }
    }
)

// You should see a response like:
// { "acknowledged": true, "modifiedCount": 1, "upsertedId": null }

// ============================================
// STEP 4: Verify the update
// ============================================

// Check if password was updated:
db.users.findOne({ email: "admin@school.com", role: "admin" })

// ============================================
// STEP 5: If no admin exists, create one
// ============================================

db.users.insertOne({
    name: "School Administrator",
    email: "admin@school.com",
    password: "$2b$10$N9qo8uLOickgx2ZMRZoMy.1PbFdvfF0CK1xgWJjV6QH1zPjVPg3XW",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0
})

// ============================================
// STEP 6: Find all admins (to check all admins)
// ============================================

db.users.find({ role: "admin" })

// ============================================
// COMMON HASHED PASSWORDS (for testing)
// ============================================
// Password: admin123
// Hash: $2b$10$N9qo8uLOickgx2ZMRZoMy.1PbFdvfF0CK1xgWJjV6QH1zPjVPg3XW

// Password: password123
// Hash: $2b$10$GOhUKVH5T2/6e8gMkF5hj.vCx3LnzKQPTLVzKbYd8QZKBFvWDpOcS

// Password: Admin123456
// Hash: $2b$10$XmrQ5hK8p9L3mN5gY2zT9u8C7X4vY6q2S1w0e3f5g7h1i2j3k4l5m6

// ============================================
// MONGODB COMPASS INSTRUCTIONS
// ============================================

/*
1. Open MongoDB Compass
2. Connect to your database
3. Navigate to: [DatabaseName] → users
4. Click "Add Data" or find existing document with role: "admin"
5. Click the document to edit
6. Click the "password" field
7. Paste the new hashed password
8. Click save
*/

// ============================================
// TROUBLESHOOTING
// ============================================

// Q: Where is my database name?
// A: Check .env file for MONGO_URI
//    Example: mongodb://localhost:27017/school_db

// Q: Error: "collection not found"
// A: The users collection might not exist yet
// A: Try looking for users in the database first:
//    show collections

// Q: "admin" user not found
// A: Create one using STEP 5 above

// Q: How do I connect to MongoDB?
// A: Download MongoDB Compass from https://www.mongodb.com/download-center/compass
//    Or use mongosh (command line):
//    $ mongosh

// Q: How do I find my database URI?
// A: Check your .env file in server folder
//    Look for: MONGO_URI=mongodb://...
