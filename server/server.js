const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Connect to the database.
mongoose.connect('mongodb://localhost/marvel-faves');

// Apply middlware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Create /auth route.
app.use('/auth', require('./routes/auth'));

// Create /users route.
app.use('/users', require('./routes/users'));

// Start the server.
app.listen(8888, function() {
    console.log('Server is running at http://localhost:8888 ...');
});
