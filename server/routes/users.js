const express = require('express');
const User = require('../models/user');

const router = express.Router();

/* == GENERAL ================================ */

/**
 * Get a user.
 */
router.post('/', function(req, res) {
    // ...
});

/**
 * Add a new user.
 */
router.post('/', function(req, res) {
    // ...
});

/* == FAVES ================================ */

/**
 * Get all faves for a user.
 */
router.get('/:id/faves', function(req, res) {
    // ...
});

/**
 * Add a fave to a user.
 */
router.post('/:id/faves', function(req, res) {
    // ...
});

/**
 * Remove a fave from a user.
 */
router.delete('/:id/faves', function(req, res) {
    // ...
});

/* == LIKES ================================ */

/**
 * Get all likes for a user.
 */
router.get('/:id/likes', function(req, res) {
    // ...
});

/**
 * Add a like to a user.
 */
router.post('/:id/likes', function(req, res) {
    // ...
});

/**
 * Remove a like from a user.
 */
router.delete('/:id/likes', function(req, res) {
    // ...
});

/* == DISLIKES ================================ */

/**
 * Get all dislikes for a user.
 */
router.get('/:id/dislikes', function(req, res) {
    // ...
});

/**
 * Add a dislike to a user.
 */
router.post('/:id/dislikes', function(req, res) {
    // ...
});

/**
 * Remove a dislike from a user.
 */
router.delete('/:id/dislikes', function(req, res) {
    // ...
});

module.exports = router;
