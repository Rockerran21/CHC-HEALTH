const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // Define your schema fields here
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Other fields can be added here
});

// Optional: Pre-save hook to hash password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

let User;
if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User', userSchema);
}

module.exports = User;
