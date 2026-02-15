const Marks = require("../models/marks");

exports.addMarks = async (req, res) => {
    try {
        const { studentEmail, subject, marks, attendance } = req.body;

        if (!studentEmail || !subject || marks === undefined || attendance === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (marks < 0 || marks > 100 || attendance < 0 || attendance > 100) {
            return res.status(400).json({ message: "Marks and attendance must be between 0 and 100" });
        }

        // Check if marks already exist and update or create
        const existingMarks = await Marks.findOneAndUpdate(
            { studentEmail, subject },
            {
                marks,
                attendance,
                teacherEmail: req.user.email, // Assuming teacherEmail is available from auth middleware
            },
            { new: true, upsert: true }
        );

        res.status(201).json({
            message: "Marks added/updated successfully",
            data: existingMarks
        });
    } catch (error) {
        console.error("Error adding marks:", error);
        res.status(500).json({ message: "Error adding marks", error: error.message });
    }
};

exports.getMarks = async (req, res) => {
    try {
        const { studentEmail } = req.query;

        if (!studentEmail) {
            return res.status(400).json({ message: "Student email is required" });
        }

        const marks = await Marks.find({ studentEmail });
        res.status(200).json({
            message: "Marks retrieved successfully",
            data: marks
        });
    } catch (error) {
        console.error("Error fetching marks:", error);
        res.status(500).json({ message: "Error fetching marks", error: error.message });
    }
};

exports.getStudentMarks = async (req, res) => {
    try {
        // Get marks for the logged-in student
        const studentEmail = req.user.email; // Assuming studentEmail is available from auth middleware
        const marks = await Marks.find({ studentEmail });
        res.status(200).json({
            message: "Your marks retrieved successfully",
            data: marks
        });
    } catch (error) {
        console.error("Error fetching student marks:", error);
        res.status(500).json({ message: "Error fetching marks", error: error.message });
    }
};
