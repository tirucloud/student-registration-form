const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
    address: String,
    date: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// POST route to register a student
app.post('/register', (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        address: req.body.address
    });

    student.save()
        .then(() => res.status(201).send('Student Registered'))
        .catch((err) => res.status(400).send('Error: ' + err));
});

// Serve the HTML form on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server listening
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
