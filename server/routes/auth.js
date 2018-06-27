const express = require('express');
const jwt = require('jsonwebtoken');
const jwtValidate = require('express-jwt');
const secret = process.env.SECRET || 'secret_for_dev';
const User = require('../models/user');

/**
 * Begin /auth router.
 */
const router = express.Router();

/**
 * Login and get back a token.
 */
router.post('/login', function(req, res) {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.sendStatus(400);

        user.checkPassword(req.body.password, (err, match) => {
            if (err) throw err;
            if (!match) return res.sendStatus(401);

            const token = jwt.sign(user.toObject(), secret, {
                expiresIn: '24h'
            });

            return res.status(201).send({ token, user: user.withoutPassword() }); // prettier-ignore
        });
    });
});

/**
 * Verify token is still valid.
 */
router.get('/verify', jwtValidate({ secret }), function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err) {
            return res.status(500).send({ success: false, err });
        }
        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: 'User no longer exists.' });
        }
        return res.status(200).send(user.withoutPassword());
    });
});

/**
 * Export /auth router.
 */
module.exports = router;
