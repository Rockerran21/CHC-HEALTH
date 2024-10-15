const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../Models/User.js'); // Adjust the path as needed

const uri = "mongodb+srv://Ranjan:Ranjan%4079115@chc-health.zboztgu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateUserPassword() {
    try {
        const hashedPassword = await bcrypt.hash('Ranjan123', 12);
        await User.findOneAndUpdate({ username: 'Ranjan123' }, { password: hashedPassword });

        console.log('User password updated successfully');
    } catch (error) {
        console.error('Error updating user password:', error);
    } finally {
        mongoose.disconnect();
    }
}

updateUserPassword();
