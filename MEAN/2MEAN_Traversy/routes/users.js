const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success : false,  msg: "Failed to register user"})
        } else {
            res.json({success : true,  msg: "User: " + newUser.username + " successfully registered"})
        }
    });
});

//Authentication
router.post('/authenticate', (req, res) => {
    res.send('Authentication here here')
});

//Profile
router.get('/profile', (req, res) => {
    res.send('Profile here')
});



// router.get('/login', (req, res) => {
//     res.send('Login GET here')
// });

// router.post('/login', (req, res) => {
//     res.send('Login PUT here')
// });


module.exports = router;