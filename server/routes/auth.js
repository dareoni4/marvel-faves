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
