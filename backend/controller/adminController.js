
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authenticationMiddleware = require("../middlewares/authentication");

dotenv.config({ path: "./config/config.env" });

const config = require('../config/default');

dotenv.config("./config/config.env");
const jwtsecretO = config.jwtsecret;

// const secret = process.env.SECRET;
const secret = jwtsecretO;
// console.log(secret)

const createUser = async (req, res) => {

    const { email, password, name, role, subject } = req.body;
    console.log(email)
    try {
        const existingUser = await Admin.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json(`User Already Exist With this email: ${email}`);
        }
        const user = new Admin({ email, password, name, role, subject });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.save()
            .then(Newuser => {
                jwt.sign(
                    { id: user._id, email: user.email, role: user.role },
                    // 
                    secret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role
                            }
                        });
                    }
                )
            });

    } catch (error) {
        console.log(error);
        res.status(409).send("Some thing went wong in creating new user");
    }

}

const loginUser = async (req, res) => {

    //

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: 'Please enter all fields' });
    }
    Admin.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user._id, email: user.email, role: user.role },
                        secret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role
                                }
                            });
                        }
                    )
                })
        })

};
const listTeachers = async (req, res) => {
    // const { email, password } = req.body;
    const teachersList = await Admin.find({ role: 'teacher' });
    res.status(200).json(teachersList);

}

// ===============================
// GET SINGLE TEACHER
// ===============================
const getTeacher = async (req, res) => {
    try {
        const teacher = await Admin.findById(req.params.id).select('-password');
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teacher", error: error.message });
    }
};

// ===============================
// UPDATE TEACHER
// ===============================
const updateTeacher = async (req, res) => {
    try {
        const { name, email, subject, role } = req.body;

        // Check if email is already taken by another teacher
        if (email) {
            const existingTeacher = await Admin.findOne({ email, _id: { $ne: req.params.id } });
            if (existingTeacher) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const updatedTeacher = await Admin.findByIdAndUpdate(
            req.params.id,
            { name, email, subject, role },
            { new: true }
        ).select('-password');

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({
            message: "Teacher updated successfully",
            data: updatedTeacher
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating teacher", error: error.message });
    }
};

// ===============================
// DELETE TEACHER
// ===============================
const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Admin.findByIdAndDelete(req.params.id);

        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting teacher", error: error.message });
    }
};

// const listUsers = (req,res) => {
//     Admin.findById(req.user.id)
//         .select('-password')
//         .then(user => res.json(user));
// }

module.exports = { createUser, loginUser, listTeachers, getTeacher, updateTeacher, deleteTeacher };