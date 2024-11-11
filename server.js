const fs = require('fs');
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Route to homepage
app.get('/', (req, res) => {
    res.render('index.ejs');
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

app.listen(port, () => {
    console.log(`Dya-welu website is Live at port ${port}`);
});
