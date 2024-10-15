const express = require('express');
const PatientVitals = require('../models/PatientVitals');
const router = express.Router();

// Endpoint to submit patient vitals
router.post('/submit', async (req, res) => {
    try {
        const newPatientVitals = new PatientVitals(req.body);
        await newPatientVitals.save();
        res.status(201).json({ message: 'Patient vitals submitted successfully', vitalsId: newPatientVitals._id });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting patient vitals', error: error.message });
    }
});

// Endpoint to get patient vitals by date
router.get('/:patientName/date/:date', async (req, res) => {
    try {
        const { patientName, date } = req.params;
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(startDate.getDate() + 1);

        const vitals = await PatientVitals.find({
            patientName: patientName,
            date: {
                $gte: startDate,
                $lt: endDate
            }
        });
        res.status(200).json(vitals);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving patient vitals', error: error.message });
    }
});

module.exports = router;
