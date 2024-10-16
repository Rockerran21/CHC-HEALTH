const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
    // Other fields can be added here
});

// Optional: Pre-save hook to hash password
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

let Admin;
if (mongoose.models.Admin) {
    Admin = mongoose.model('Admin');
} else {
    Admin = mongoose.model('Admin', adminSchema);
}

module.exports = Admin;
