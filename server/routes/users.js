const express = require('express');
const User = require('../models/user');

const router = express.Router();

/* == GENERAL ================================ */

/**
 * Get all users.
 */
router.get('/', function(req, res) {
    User.find()
        .then(users => {
            return res
                .status(200)
                .send(users.map(user => user.withoutPassword()));
        })
        .catch(err => {
            return res.status(500).send(err);
        });
});

/**
 * Get a user.
 */
router.get('/:id', function(req, res) {
    User.findById(req.params.id)
        .then(user => {
            return res.status(200).send(user.withoutPassword());
        })
        .catch(err => {
            return res.status(404).send(err);
        });
});

/**
 * Add a new user.
 */
router.post('/', function(req, res) {
    const user = new User(req.body);
    user.save()
        .then(newUser => {
            return res.status(201).send(newUser.withoutPassword());
        })
        .catch(err => {
            return res.status(500).send(err);
        });
});

/* == FAVES/LIKES/DISLIKES ================================ */

/**
 * Create seperate endpoints for faves, likes, and
 * dislikes, which all perform the same, basic tasks.
 *
 * RULES:
 * 1. When adding a character it must id, name, and
 *    thumb attributes.
 * 2. To add a character, it must not exist already.
 * 3. To remove a character, it must (obiously) exist.
 */
['faves', 'likes', 'dislikes'].forEach(function(endpoint) {
    /**
     * Get all faves/likes/dislikes for a user.
     */
    router.get(`/:id/${endpoint}`, function(req, res) {
        User.findById(req.params.id)
            .then(user => {
                return res.status(200).send(user[endpoint]);
            })
            .catch(err => {
                return res.status(404).send(err);
            });
    });

    /**
     * Add a character to user's faves/likes/dislikes.
     */
    router.post(`/:id/${endpoint}`, function(req, res) {
        const newItem = req.body;
        const required = ['id', 'name', 'thumb'];

        // New character to add must have required attributes.
        for (let i = 0; i < required.length; i++) {
            let attribute = required[i];

            if (!newItem[attribute]) {
                return res.status(500).send({
                    message: `Item "${attribute}" missing.`
                });
            }
        }

        User.findById(req.params.id)
            .then(user => {
                const currentItems = user[endpoint];

                // Only add the character if doesn't already exist; and
                // if not, just let the promise chain move forward, not
                // actually updating anything.
                if (!currentItems.find(item => item.id === newItem.id)) {
                    currentItems.push({
                        link: '',
                        comicsNum: 0,
                        seriesNum: 0,
                        storiesNum: 0,
                        ...newItem
                    });
                }

                return user.update({ [endpoint]: currentItems });
            })
            .then(() => {
                return res
                    .status(200)
                    .send({ message: `Character added to ${endpoint}.` });
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    });

    /**
     * Remove a character from user's faves/likes/dislikes.
     */
    router.delete(`/:id/${endpoint}/:toRemove`, function(req, res) {
        User.findById(req.params.id)
            .then(user => {
                const currentItems = user[endpoint];
                const toRemoveIndex = currentItems.findIndex(
                    item => item.id === req.params.toRemove
                );

                // Only remove the item if it actually exists; and if
                // not, just let the promise chain move forward, not
                // actually updating anything.
                if (toRemoveIndex < 0) {
                    currentItems.splice(toRemoveIndex, 1);
                }

                return user.update({ [endpoint]: currentItems });
            })
            .then(() => {
                return res
                    .status(200)
                    .send({ message: `Character removed from ${endpoint}.` });
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    });
});

module.exports = router;
