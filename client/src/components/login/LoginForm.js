import React from 'react';

/**
 * Display logged-in user's faves, likes and
 * dislikes.
 *
 * @param {Object}   props              Component properties.
 * @param {Function} props.handleSubmit Handles form submission.
 * @param {Function} props.handleChange Handles input changes.
 * @param {Object}   props.inputs       Controlled input values.
 * @param {String}   props.error        Submission error, if exists.
 * @return {Component}
 */
const LoginForm = props => {
    const { handleSubmit, handleChange, inputs, error } = props;

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <p>
                <label>Username</label>
                <input
                    name="username"
                    type="text"
                    value={inputs.username}
                    onChange={handleChange}
                />
            </p>
            <p>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
            </p>
            <button>Submit</button>
        </form>
    );
};

export default LoginForm;
