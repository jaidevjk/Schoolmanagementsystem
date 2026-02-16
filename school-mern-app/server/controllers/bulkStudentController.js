import XLSX from 'xlsx';
import Student from '../models/Student.js';
import User from '../models/User.js';

export const importStudentsFromExcel = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

        const errors = [];
        let successCount = 0;

        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            // Expected headers: name, email, fatherName, motherName, phoneNumber, dateOfBirth, gender, address, classId
            if (!r.name || !r.email) {
                errors.push({ row: i + 2, message: 'Missing required name or email' });
                continue;
            }

            try {
                // Create user for student if necessary
                let user = await User.findOne({ email: r.email.toLowerCase().trim() });
                if (!user) {
                    const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
                    user = await User.create({ name: r.name, email: r.email.toLowerCase().trim(), password: tempPassword, role: 'student', phone: String(r.phoneNumber || '') });
                }

                const studentData = {
                    userId: user._id,
                    name: r.name,
                    email: r.email.toLowerCase().trim(),
                    rollNumber: r.rollNumber || (`STU-${Date.now()}-${i}`),
                    fatherName: r.fatherName || '',
                    motherName: r.motherName || '',
                    dateOfBirth: r.dateOfBirth ? new Date(r.dateOfBirth) : null,
                    gender: r.gender || '',
                    address: r.address || '',
                    phoneNumber: String(r.phoneNumber || ''),
                    status: 'active'
                };

                await Student.create(studentData);
                successCount++;
            } catch (err) {
                errors.push({ row: i + 2, message: err.message });
            }
        }

        res.json({ successCount, errors });
    } catch (err) {
        console.error('Bulk import error:', err);
        res.status(500).json({ message: err.message || 'Failed to import' });
    }
};

export const downloadSample = (req, res) => {
    // Build a sample workbook in memory
    const sample = [
        { name: 'John Doe', email: 'john@example.com', fatherName: 'Mr Doe', motherName: 'Mrs Doe', phoneNumber: '9876543210', dateOfBirth: '2010-05-03', gender: 'Male', address: 'Some address', rollNumber: '001' }
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sample);
    XLSX.utils.book_append_sheet(wb, ws, 'students');
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', 'attachment; filename=students_sample.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
};
