const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Set up skeleton for how user data should
 * be structured.
 */
const skeleton = {
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    faves: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    }
};

/**
 * Create user schema.
 */
const userSchema = new mongoose.Schema(skeleton);

/**
 * Before saving any new user, encrypt
 * the password.
 */
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

/**
 * Compare received password with hashed
 * password.
 */
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

/**
 * When a user object is sent back, delete the
 * password.
 */
userSchema.methods.withoutPassword = function() {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);
