const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Adjust the path as needed
const Doctor = require('./models/Doctor'); // Adjust the path as needed
const User = require('./models/User'); // Adjust the path as needed

const adminRoutes = require('./Routes/adminRoutes');
const doctorRoutes = require('./Routes/doctorRoutes');
const userRoutes = require('./Routes/userRoutes');
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
    const admin = await Admin.findOne({ username });
    if (!admin || !await bcrypt.compare(password, admin.password)) {
        return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    res.json({ message: 'Admin login successful' });
});

// Doctor Login Endpoint
app.post('/doctor-login', async (req, res) => {
    const { username, password } = req.body;
    const doctor = await Doctor.findOne({ username });
    if (!doctor || !await bcrypt.compare(password, doctor.password)) {
        return res.status(401).json({ message: 'Invalid doctor credentials' });
    }
    res.json({ message: 'Doctor login successful' });
});

// User Login Endpoint
app.post('/user-login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid user credentials' });
    }
    res.json({ message: 'User login successful' });
});
app.use('/admin', adminRoutes);
app.use('/doctor', doctorRoutes);
app.use('/user', userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
