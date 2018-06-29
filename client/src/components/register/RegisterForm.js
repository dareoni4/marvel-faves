import React from 'react';

/**
 * Display registration form, to create a
 * new user.
 *
 * @return {Component}
 */
const RegisterForm = props => {
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
