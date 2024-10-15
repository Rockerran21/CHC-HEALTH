const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./Models/Admin.js'); // Adjust path as needed
const Doctor = require('./Models/Doctor.js'); // Adjust path as needed
const User = require('./Models/User.js'); // Adjust path as needed


const uri = "mongodb+srv://Ranjan:Ranjan%4079115@chc-health.zboztgu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(e => console.log("MongoDB connection error:", e));


async function seedDatabase() {
    try {
        // Password hashing for the sample data
        const hashedPassword = await bcrypt.hash("password123", 12);

        // Sample Admin.js
        const admin = new Admin({
            username: 'adminUser',
            password: hashedPassword,
            email: 'admin@example.com'
        });
        await admin.save();

        // Sample Doctor
        const doctor = new Doctor({
            username: 'doctorUser',
            password: hashedPassword,
            email: 'doctor@example.com',
            specialty: 'Cardiology'
        });
        await doctor.save();

        // Sample User
        const user = new User({
            username: 'normalUser',
            password: hashedPassword,
            email: 'user@example.com',
            age: 30,
            gender: 'Male'
        });
        await user.save();

        console.log("Database seeded!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.disconnect();
    }
}

seedDatabase();
