const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../Models/Admin.js'); // Adjust the path as needed

const uri = "mongodb+srv://Ranjan:Ranjan%4079115@chc-health.zboztgu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateAdminPassword() {
    try {
        const hashedPassword = await bcrypt.hash('Admin123', 12);
        await Admin.findOneAndUpdate({ username: 'Admin123' }, { password: hashedPassword });

        console.log('Admin password updated successfully');
    } catch (error) {
        console.error('Error updating admin password:', error);
    } finally {
        mongoose.disconnect();
    }
}

updateAdminPassword();
