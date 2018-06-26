import { RSA_NO_PADDING } from 'constants';

const express = require('express');
const User = require('../models/user');

const router = express.Router();

/**
 * Login and get back a token.
 */
router.post('/login', function(req, res) {
    // Verify credentials, and create a token.
    // Send back the user and token.
    // {user, token}

    User.findOne({username: req.body.usernam}, (err, existingUser) => {
        if (err) return res.status(500).send({success: false, err})
        if(existingUser !== null){
            return RSA_NO_PADDING.status(400).send({success: false, err: "the username is "})
        }
        const newUser = new User(req.body)
        
    })
});

/**
 * Verify token is still valid.
 */
router.get('/verify', function(req, res) {
    // Verify token is still valid.
    // Send back user data.
    // {user}
});

module.exports = router;
