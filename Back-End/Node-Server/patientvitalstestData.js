const mongoose = require('mongoose');
const PatientVitals = require('./Models/patientVitals'); // Adjust the path as needed

// ... (Your existing MongoDB connection code)
const uri = "mongodb+srv://Ranjan:Ranjan%4079115@chc-health.zboztgu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(e => console.log("MongoDB connection error:", e));
async function seedPatientVitals() {
    try {
        // Sample Patient Vitals
        const patientVitalsData = new PatientVitals({
            patientName: 'John Doe',
            age: 40,
            bp: '65/49',
            glucoseLevel: 10,
            heartRate: 40,

            date: new Date() // Today's date
        });
        await patientVitalsData.save();

        console.log("Patient vitals added to the database!");
    } catch (error) {
        console.error("Error adding patient vitals to database:", error);
    } finally {
        // It's generally a good idea to close the database connection when you're done
        await mongoose.disconnect();
    }
}

// Run the seed function
seedPatientVitals();
