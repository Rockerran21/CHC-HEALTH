const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Doctor = require('../Models/Doctor.js'); // Corrected to Doctor model

const uri = "mongodb+srv://Ranjan:Ranjan%4079115@chc-health.zboztgu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateDoctorPassword() {
    try {
        const hashedPassword = await bcrypt.hash('Ranjan123', 12);
        await Doctor.findOneAndUpdate({ username: 'Ranjan123' }, { password: hashedPassword });

        console.log('Doctor password updated successfully');
    } catch (error) {
        console.error('Error updating doctor password:', error);
    } finally {
        mongoose.disconnect();
    }
}

updateDoctorPassword();
