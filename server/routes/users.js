const express = require('express');
const jwtValidate = require('express-jwt');
const secret = process.env.SECRET || 'secret_for_dev';
const User = require('../models/user');

/**
 * Begin /users router.
 */
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
 * Get a single user.
 */
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            return res.status(200).send(user.withoutPassword());
        })
        .catch(err => {
            return res.status(404).send(err);
        });
});

/* == FAVES/LIKES/DISLIKES ================================ */

/**
 * Create seperate endpoints for faves, likes, and
 * dislikes, which all perform the same, basic tasks.
 *
 * Rules:
 * 1. When adding a character it must id, name, and
 *    thumb attributes.
 * 2. To add a character, it must not exist already.
 * 3. To add a character, user must be logged in and
 *    adding to their own faves/likes/dislikes.
 * 4. To remove a character, it must (obiously) exist.
 * 5. To remove a character, user must be logged in and
 *    removing from their own faves/likes/dislikes.
 */
['faves', 'likes', 'dislikes'].forEach(function(endpoint) {
    /**
     * Get all faves/likes/dislikes for a user.
     */
    router.get(`/:id/${endpoint}`, (req, res) => {
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
     *
     * Authorization is required and the current user
     * must be editing their own faves/likes/dislikes.
     */
    router.post(`/:id/${endpoint}`, jwtValidate({ secret }), (req, res) => {
        const newItem = req.body;
        const required = ['id', 'name', 'thumb'];

        // Make sure logged-in user matches user being edited.
        if (req.user._id !== req.params.id) {
            return res.status(403).send({
                message: `You can only edit your own ${endpoint}.`
            });
        }

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
     *
     * Authorization is required and the current user
     * must be removing their own faves/likes/dislikes.
     */
    router.delete(
        `/:id/${endpoint}/:toRemove`,
        jwtValidate({ secret }),
        (req, res) => {
            // Make sure logged-in user matches user being edited.
            if (req.user._id !== req.params.id) {
                return res.status(403).send({
                    message: `You can only edit your own ${endpoint}.`
                });
            }

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
                    return res.status(200).send({
                        message: `Character removed from ${endpoint}.`
                    });
                })
                .catch(err => {
                    return res.status(500).send(err);
                });
        }
    );
});

/**
 * Export /users router.
 */
module.exports = router;
