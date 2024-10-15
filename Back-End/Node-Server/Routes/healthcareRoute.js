const express = require('express');
const HealthcareForm = require('../Models/healthCare');
const router = express.Router();

router.post('/submit', async (req, res) => {
    try {
        const newHealthcareForm = new HealthcareForm(req.body);
        await newHealthcareForm.save();
        res.status(201).json({ message: 'Form submitted successfully', formId: newHealthcareForm._id });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting form', error: error.message });
    }
});

module.exports = router;
