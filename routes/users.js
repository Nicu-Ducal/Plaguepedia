const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('dotenv').config();

// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Posting
router.post('/register', (req, res) => {
    const { username, password, password2, email, birthday } = req.body;
    let errors = [];

    // Check required fields
    if (!username || !password || !password2 || !email || !birthday) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: "Passwords don't match" });
    }

    // Check pass legnth
    if (password.length < 6) {
        errors.push({ msg: 'Password is too short. It should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            password,
            password2,
            email,
            birthday
        });
    } else {
        // Registration passed
        // Check if an user with the same username or email has already been registered
        User.findOne({ $or: [{ username: username }, { email: email }] })
            .then(user => {
                if (user) {
                    if (user.username === username) {
                        errors.push({ msg: 'An user with that username is already registered' });
                    }
                    if (user.email === email) {
                        errors.push({ msg: 'An user with that email is already registered' });
                    }
                    res.render('register', {
                        errors,
                        username,
                        password,
                        password2,
                        email,
                        birthday
                    });
                } else {
                    const newUser = new User({
                        username, email, password, birthday
                    });

                    // Hashing the password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Make password a hash
                            newUser.password = hash;

                            // Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }));

                }
            })
            .catch(err => console.log(err));
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    process.env.IP = req.body.ipAddress;
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/login');
});


module.exports = router;