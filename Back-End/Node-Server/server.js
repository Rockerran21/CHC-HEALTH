const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./Models/Admin.js'); // Adjust the path as needed
const Doctor = require('./Models/Doctor.js'); // Adjust the path as needed
const User = require('./Models/User.js'); // Adjust the path as needed
const HealthcareForm = require('./Models/healthCare.js'); // Adjust the path as needed
const PatientVitals = require('./Models/patientVitals'); // Adjust the path as needed
const adminRoutes = require('./Routes/adminRoutes');
const doctorRoutes = require('./Routes/doctorRoutes');
const userRoutes = require('./Routes/userRoutes');
const healthcareFormRoutes = require('./Routes/healthcareRoute'); // Corrected the path
const patientVitalsRoutes = require('./Routes/patientvitalsRoutes' ); // Corrected the path
const app = express();

// MongoDB connection using Mongoose
const uri = "mongodb+srv://Ranjan:Ranjan%4079115@chc-health.zboztgu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(e => console.log("MongoDB connection error:", e));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Admin Login Endpoint
app.post('/admin-login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({ message: 'Admin login successful' });
    } catch (error) {
        console.error("Error in admin-login:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Doctor Login Endpoint
app.post('/doctor-login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ username });
        if (!doctor) {
            return res.status(401).json({ message: 'Doctor not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({ message: 'Doctor login successful' });
    } catch (error) {
        console.error("Error in doctor-login:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login Endpoint
app.post('/user-login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Log the hash stored in the database
        console.log("Stored hash in database:", user.password);

        // Log the plaintext password being compared (for debugging purposes only)
        console.log("Password attempt:", password);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.json({ message: 'User login successful' });
    } catch (error) {
        console.error("Error in user-login:", error);
        res.status(500).json({ message: 'Server error' });
    }
});


// User Registration Endpoint
app.post('/user-register', async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password and confirmed password, then create a new user
        const hashedPassword = await bcrypt.hash(password, 12);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 12);
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});
// Doctor Registration Endpoint
app.post('/doctor-register', async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        // Validate inputs (you can add more validation as needed)
        if (!email || !username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new doctor
        const newDoctor = new Doctor({
            email,
            username,
            password: hashedPassword
            // Add other fields as needed
        });

        // Save the doctor
        await newDoctor.save();

        res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (error) {
        console.error('Error in doctor registration:', error);
        res.status(500).json({ message: 'Error registering doctor' });
    }
});
// Admin Registration Endpoint
app.post('/admin-register', async (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    // Validate inputs (you can add more validation as needed)
    if (!email || !username || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new admin
    const newAdmin = new Admin({
        email,
        username,
        password: hashedPassword
        // Add other fields as needed
    });

    // Save the admin
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
});

// Endpoint for Healthcare Form Submission
app.post('/healthcare-form/submit', async (req, res) => {
    try {
        const newFormEntry = new HealthcareForm(req.body);
        await newFormEntry.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Error submitting form' });
    }
});
// Endpoint to get patient vitals by patient name and date
app.get('/patient-vitals/:patientName/date/:date', async (req, res) => {
    try {
        const { patientName, date } = req.params;
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const vitals = await PatientVitals.find({
            patientName: new RegExp(patientName, 'i'), // Case-insensitive search
            date: {
                $gte: startDate,
                $lt: endDate
            }
        }).sort({ date: 1 }); // Sort by date, ascending

        res.status(200).json(vitals);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving patient vitals', error: error.message });
    }
});



app.use('/admin', adminRoutes);
app.use('/doctor', doctorRoutes);
app.use('/user', userRoutes);
app.use('healthcare-form', healthcareFormRoutes); // Corrected the path
app.use('/patient-vitals', patientVitalsRoutes); // Use the base path for patient vitals routes

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
