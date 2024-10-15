const mongoose = require('mongoose');

const patientVitalsSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    bp: { type: String, required: true }, // "120/80"
    glucoseLevel: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

let PatientVitals;
if (mongoose.models.PatientVitals) {
    PatientVitals = mongoose.model('PatientVitals');
} else {
    PatientVitals = mongoose.model('PatientVitals', patientVitalsSchema);
}

module.exports = PatientVitals;
