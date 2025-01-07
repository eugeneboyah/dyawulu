const fs = require('fs');
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); 
require('dotenv').config();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// Route to homepage
// Route to render the appointment form page
app.get('/', (req, res) => {
    res.render('index', { 
        success: null, 
        message: null 
    });
});


app.get('/call-to-action', (req, res) => {
    res.render('call-to-action.ejs');
});

app.get('/404', (req, res) => {
    res.render('404.ejs');
});

app.get('/classes', (req, res) => {
    res.render('classes.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.get('/enroll', (req, res) => {
    res.render('enroll.ejs');
});

app.get('/ruby', (req, res) => {
    res.render('ruby.ejs');
});

app.get('/testimonial', (req, res) => {
    res.render('testimonial.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/team', (req, res) => {
    res.render('team.ejs');
});

// Route to appointment form submission
app.post('/appointment', (req, res) => {
    const { gname, gmail, cname, cage, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for port 465
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        }
    });

    const mailOptions = {
        from:`"${gname}" <${gmail}>`, 
        to: process.env.EMAIL_USER, 
        replyTo: gmail,
        subject: `📅 New Appointment Request from ${gname}`,
        html: `
            <h1>New Appointment Request</h1>
            <p><strong>Guardian Name:</strong> ${gname}</p>
            <p><strong>Guardian Email:</strong> ${gmail}</p>
            <p><strong>Child Name:</strong> ${cname}</p>
            <p><strong>Child Age:</strong> ${cage}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error);
            res.json({ 
                success: false, 
                message: 'Something went wrong. Please try again later.' 
            });
        } else {
            console.log('Email sent successfully: ' + info.response);
            res.json({ 
                success: true, 
                message: 'Your appointment request has been sent successfully!' 
            });
        }
    });
});




app.listen(port, () => {
    console.log(`Dya-welu website is Live at port http://localhost:${port}`);
});
