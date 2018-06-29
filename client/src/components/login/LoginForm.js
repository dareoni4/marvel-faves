import React from 'react';

/**
 * Display logged-in user's faves, likes and
 * dislikes.
 *
 * @return {Component}
 */
const LoginForm = props => {
    const { handleSubmit, handleChange, inputs } = props;

    return (
        <form onSubmit={handleSubmit}>
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
