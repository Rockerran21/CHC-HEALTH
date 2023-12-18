const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const Doctor = require('../models/Doctor');
const router = express.Router();

router.post('/create-doctor', [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isStrongPassword().withMessage('Password is not strong enough'),
    body('specialty').notEmpty().withMessage('Specialty is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password, specialty } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const newDoctor = new Doctor({ username, email, password: hashedPassword, specialty });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating doctor' });
    }
});

module.exports = router;
