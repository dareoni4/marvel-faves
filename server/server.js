const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./model.js');

const app = express();

// Connect to the database.
mongoose.connect('mongodb://localhost/pokefaves');

// Apply middlware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Login and get back a token.
app.post('/login', function(req, res) {
    // Verify credentials, and create a token.
    // Send back the user and token.
    // {user, token}
});

// Verify token is still valid.
app.get('/verify', function(req, res) {
    // Verify token is still valid.
    // Send back user data.
    // {user}
});

// Modify favs of user.
app.put('/users/:id', function(req, res) {
    // ...
});

// Add a new user.
app.post('/users', function(req, res) {
    // ...
});

// Start the server.
app.listen(8888, function() {
    console.log('Server is running at http://localhost:8888 ...');
});
