const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const expressip = require('express-ip');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const sendMail = require('./config/mail.js');
const fs = require('fs');

const app = express();

// Passport config
require('./config/passport')(passport);


// DB Config
const db = require('./config/keys.js').MongoURI;


// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection to MongoDB established'))
    .catch(err => console.log(err));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// IP Middleware
app.use(expressip().getIpInfoMiddleware);

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());


// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// Email sending
app.post('/email', (req, res) => {
    const { name, email, subject, text } = req.body;
    sendMail(name, email, subject, text, function (err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal error' });
        } else {
            res.json({ message: 'Email sent' });
        }
    });
});


// For CSS and JS
app.use('/public/styles/', express.static('public/styles'));
app.use('/public/scripts/', express.static('public/scripts'));
app.use('/public/images/', express.static('public/images'));
app.use('/public/ajax/', express.static('public/ajax'));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// 404 page - Not found
app.use((req, res, next) => {
    res.status(404).render('page_not_found');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
