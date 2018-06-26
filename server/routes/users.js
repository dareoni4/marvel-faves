const express = require('express');
const User = require('../models/user');

const router = express.Router();

/* == GENERAL ================================ */

/**
 * Get all users.
 */
router.get('/', function(req, res) {
  User.find((err, users) => {
      if(err) return res.status(500).send(err)
      return res.status(200).send(users)
  })
});

/**
 * Add a new user.
 */
router.post('/', function(req, res) {
    console.log(req.body)
    const user = new User(req.body)
    user.save((err, newUser) => {
        if(err) return res.status(500).send(err)
        return res.status(201).send(newUser)
    })
});

/* == FAVES ================================ */

/**
 * Get all faves for a user.
 */
router.get('/:id/faves', function(req, res) {
    console.log(req.params)
  const findFave = user.find(Users => user.favs === parseInt(req.params.favs))
  res.send(findFave)
});

/**
 * Add a fave to a user.
 */
router.post('/:id/faves', function(req, res) {
    const newUser = newUser(req.body)
    newUser.save((err, newUser) => {
        if(err) return res.status(500).send(err)
        return res.status(201).send(newUser)
    })
});

/**
 * Remove a fave from a user.
 */
router.delete('/:id/faves', function(req, res) {
    User.findByIdAndRemove(req.params.id), (err,deleteUser) => {
        if (err) return res.status(500).send(err)
        return res.send({message: "username deleted", deleteUser})
    }
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
