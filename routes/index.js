const express = require('express');
const router = express.Router();
const fs = require('fs');
const { ensureAuthenticated } = require('../config/auth');
require('dotenv').config();

var userdata = {};

// Contact page
router.get('/contact', (req, res) => res.render('contact'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    let date = new Date(Date.now());
    if (userdata[req.user.username] === undefined) {
        userdata[req.user.username] = {
            firstname: "Not specified",
            lastname: "Not specified",
            username: req.user.username,
            email: req.user.email,
            birthday: req.user.birthday,
            nowIP: process.env.IP,
            nowDate: date,
            lastIP: "This is your first login",
            lastDate: "This is your first login",
            loginCount: "1"
        };
    } else {
        userdata[req.user.username].lastIP = userdata[req.user.username].nowIP;
        userdata[req.user.username].lastDate = userdata[req.user.username].nowDate;
        userdata[req.user.username].nowIP = process.env.IP;
        userdata[req.user.username].nowDate = date;
        userdata[req.user.username].loginCount++;
    }
    console.log(userdata);
    res.render('dashboard', {
        user: userdata[req.user.username]
    });
});

router.get('/dashboard/settings', ensureAuthenticated, (req, res) => {
    res.render('settings', {
        user: userdata[req.user.username]
    });
});

router.post('/dashboard/settings/change', ensureAuthenticated, (req, res) => {
    console.log(req.body);
    if (req.body.change.firstname != undefined) {
        userdata[req.body.username].firstname = req.body.change.firstname;
    }
    if (req.body.change.lastname != undefined) {
        userdata[req.body.username].lastname = req.body.change.lastname;
    }
    if (req.body.change.email != undefined) {
        userdata[req.body.username].email = req.body.change.email;
    }
    if (req.body.change.birthday != undefined) {
        userdata[req.body.username].birthday = req.body.change.birthday;
    }

    req.flash('success_msg', 'Your profile was updated');
    res.render('settings', {
        user: userdata[req.body.username]
    });
});


module.exports = router;