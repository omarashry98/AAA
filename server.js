const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const gmail_password = process.env.GMAIL_PASSWORD;

// Serve static files
app.use(express.static(__dirname + '/'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'omarashry125@gmail.com',
        pass: gmail_password
    }
});


// Email sending route
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: 'omarashry125@gmail.com',
        to: 'omarashry125@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    const mailOptions2 = {
        from: 'omarashry125@gmail.com',
        to: `${email}`, // Replace with the desired recipient
        subject: 'AAA Services',
        text: `Dear ${name},\n\nI hope this email finds you well, your email has been receieved and I will be contacting you shortly.\n\nThank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error sending email' });
            return; // Return to prevent further execution
        }

        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Error sending email' });
                return; // Return to prevent further execution
            }

            console.log('both Emails sent: ' + info.response);
            // Redirect should be the last operation in this route
            res.status(200).json({ message: 'Thank you for your submission' });
        });
        
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
