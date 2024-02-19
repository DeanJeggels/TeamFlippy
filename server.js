// Import necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
require('dotenv').config();


// Create an Express application
const app = express();
const port = 3000;

// Set up middleware for parsing form data and handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

// Handle form submissions
app.post('/submit', upload.single('proofOfPayment'), (req, res) => {
    // Collect form data
    const formData = req.body;
    // Attachments
    const attachments = [];

    if (req.file) {
        attachments.push({
            filename: 'proofOfPayment.png', // Change the filename as needed
            content: req.file.buffer,
            encoding: 'base64'
        });
    }


    // Send email
    sendEmail(formData,attachments);

    // Respond to the client
    res.send('Form submitted successfully!');
});

// Function to send an email with OAuth2 authentication
function sendEmail(formData, attachments) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,         // Your Gmail email address
            pass: process.env.MAIL_PASSWORD,         // Your Gmail email password or app-specific password
            clientId: process.env.OAUTH_CLIENTID,    // OAuth2 client ID
            clientSecret: process.env.OAUTH_CLIENT_SECRET,  // OAuth2 client secret
            refreshToken: process.env.OAUTH_REFRESH_TOKEN   // OAuth2 refresh token
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USERNAME, // Use your Gmail email address
        to: 'pumiseidler1@gmail.com',
        subject: 'New Event Sign-up',
        text: `New sign-up details:\n\n${JSON.stringify(formData, null, 2)}`,
        attachments: attachments
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
