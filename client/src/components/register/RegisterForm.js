import React from 'react';

/**
 * Display registration form, to create a
 * new user.
 *
 * @param {Object}   props              Component properties.
 * @param {Function} props.handleSubmit Handles form submission.
 * @param {Function} props.handleChange Handles input changes.
 * @param {Object}   props.inputs       Controlled input values.
 * @return {Component}
 */
const RegisterForm = props => {
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
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={inputs.email}
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

export default RegisterForm;
