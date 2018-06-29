import React from 'react';
import Form from '../shared/Form';
import LoginForm from './LoginForm';

/**
 * Display login view.
 *
 * @return {Component}
 */
const Login = () => {
    return (
        <div className="view-login">
            <div className="wrap">
                <h1>Login</h1>
                <Form
                    inputs={{ username: '', password: '' }}
                    submit={inputs => console.log('Register store function...')}
                    render={props => <LoginForm {...props} />}
                />
            </div>
        </div>
    );
};

export default Login;
