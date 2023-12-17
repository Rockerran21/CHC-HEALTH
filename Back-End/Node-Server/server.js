const express = require('express');
const cors = require('cors'); // require the cors library
const app = express();

app.use(cors()); // use CORS
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json({ message: 'User Login request received' });
});
app.post('/doctor-login', (req, res) => {
    // Handle doctor login logic here
    console.log(req.body); // This will log the form data to the console
    res.json({ message: 'Doctor login request received' }); // Send a response back to the client
});
app.post('/admin-login', (req, res) => {
    // Handle doctor login logic here
    console.log(req.body); // This will log the form data to the console
    res.json({ message: 'Administrator login request received' }); // Send a response back to the client
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
