const fs = require('fs');
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); 
require('dotenv').config();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite Database
const db = new sqlite3.Database('./newsletter.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
  
      // Create Table for Subscribers
      db.run(`
        CREATE TABLE IF NOT EXISTS subscribers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Subscribers table ready.');
        }
      });
    }
  });
// Route to homepage
// Route to render the appointment form page
app.get('/', (req, res) => {
    res.render('index', { 
        success: null, 
        message: null,
        messageType: null

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

app.get('/appointment', (req, res) => {
    res.render('appointment');
});

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
        from: `"Dya-Wulu School" <${process.env.EMAIL_USER}>`, 
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
            return res.json({ 
                success: false, 
                message: 'There is an issue with our system. Please call 0775923075 / 0888237301 to make an appointment.'
            });
        } else {
            console.log('Email sent successfully: ' + info.response);
            return res.json({ 
                success: true, 
                message: 'Your appointment request has been sent successfully! We will get to you ASAP'
            });
        }
    });
    
});

// Create Transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // POST Route for Newsletter Subscriptions
  app.post('/newsletter', (req, res) => {
    const email = req.body.email;
t
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    // Save email to the database
    const query = 'INSERT INTO subscribers (email) VALUES (?)';
    db.run(query, [email], (err) => {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(400).json({ message: 'This email is already subscribed.' });
        }
        return res.status(500).json({ message: 'An error occurred while saving your subscription.' });
      }
  
      // Send Confirmation Email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing to our newsletter! Stay tuned for updates.',
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Subscription saved, but failed to send confirmation email.' });
        }
  
        console.log('Confirmation email sent:', info.response);
        res.json({ message: 'Thank you for subscribing! A confirmation email has been sent to your inbox.' });
      });
    });
  });
  

app.listen(port, () => {
    console.log(`Dya-welu website is Live at port http://localhost:${port}`);
});
