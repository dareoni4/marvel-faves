import React from 'react';
import Form from '../shared/Form';
import RegisterForm from './RegisterForm';

/**
 * Display register view, to creae a
 * new user.
 *
 * @return {Component}
 */
const Register = () => {
    return (
        <div className="view-register">
            <div className="wrap">
                <h1>Register</h1>
                <Form
                    inputs={{ username: '', email: '', password: '' }}
                    submit={inputs => console.log('Register store function...')}
                    render={props => <RegisterForm {...props} />}
                />
            </div>
        </div>
    );
};

export default Register;
