/**
 * MONGODB ADMIN PASSWORD RESET
 * 
 * Use this if you want to reset the admin password directly in MongoDB
 * 
 * Options:
 * 1. If using MongoDB Atlas (Cloud):
 *    - Open your cluster in MongoDB Atlas
 *    - Click "COLLECTIONS" tab
 *    - Find "admins" collection
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
db.admins.findOne({ email: "admin@school.com" })

// Should return something like:
// {
//   "_id": ObjectId("..."),
//   "email": "admin@school.com",
//   "password": "$2b$10$...",  // encrypted
//   "name": "Administrator",
//   "role": "admin",
//   "createdAt": ISODate("..."),
//   ...
// }

// ============================================
// STEP 2: Generate new hashed password
// ============================================

// Option A: Use bcrypt to hash the password
// Run this in Node.js first, then use the hash in MongoDB:

const bcrypt = require('bcrypt');
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

db.admins.updateOne(
    { email: "admin@school.com" },
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
db.admins.findOne({ email: "admin@school.com" })

// ============================================
// STEP 5: If no admin exists, create one
// ============================================

db.admins.insertOne({
    email: "admin@school.com",
    password: "$2b$10$N9qo8uLOickgx2ZMRZoMy.1PbFdvfF0CK1xgWJjV6QH1zPjVPg3XW",
    name: "School Administrator",
    role: "admin",
    createdAt: new Date(),
    __v: 0
})

// ============================================
// COMMON HASHED PASSWORDS (for testing)
// ============================================
// Password: admin123
// Hash: $2b$10$N9qo8uLOickgx2ZMRZoMy.1PbFdvfF0CK1xgWJjV6QH1zPjVPg3XW

// Password: password123
// Hash: $2b$10$GOhUKVH5T2/6e8gMkF5hj.vCx3LnzKQPTLVzKbYd8QZKBFvWDpOcS

// ============================================
// MONGODB COMPASS INSTRUCTIONS
// ============================================

/*
1. Open MongoDB Compass
2. Connect to your database
3. Navigate to: [DatabaseName] → admins
4. Click "Add Data" or find existing document
5. Click the document to edit
6. Click the "password" field
7. Paste the new hashed password
8. Click save
*/

// ============================================
// TROUBLESHOOTING
// ============================================

// Q: Where is my database name?
// A: Check config/config.env or config/default.json for MONGODB_URL

// Q: Error: "collection not found"
// A: The admin collection might be named differently
// Try: db.users.findOne({ role: "admin" })

// Q: How do I connect to MongoDB?
// A: Download MongoDB Compass from https://www.mongodb.com/products/compass
//    Or use MongoDB Atlas (Cloud)
