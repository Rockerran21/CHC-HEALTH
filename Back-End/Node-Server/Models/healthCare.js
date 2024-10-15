const mongoose = require('mongoose');

const healthcareFormSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    userName: { type: String , required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    nearestLandmark: { type: String },
    email: { type: String },
    description: { type: String, required: true },
    casualtyLevel: { type: String, required: true },
});

let HealthcareForm;
if (mongoose.models.HealthcareForm) {
    HealthcareForm = mongoose.model('HealthcareForm');
} else {
    HealthcareForm = mongoose.model('HealthcareForm', healthcareFormSchema);
}

module.exports = HealthcareForm;
