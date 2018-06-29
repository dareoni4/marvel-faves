import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store';
import Form from '../shared/Form';
import LoginForm from './LoginForm';

/**
 * Display login view.
 */
class Login extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);
        this.state = { error: '' };
    }

    /**
     * Handle login, and handling success
     * and error.
     */
    handleLogin(credentials) {
        this.props.login(credentials).catch(error => {
            this.setState({
                error: 'The username or password was not correct.'
            });
        });
    }

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const { isLoggedIn } = this.props;
        const { error } = this.state;

        if (isLoggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="view-login">
                <div className="wrap">
                    <h1>Login</h1>
                    <Form
                        inputs={{ username: '', password: '' }}
                        error={error}
                        submit={inputs => this.handleLogin(inputs)}
                        render={props => <LoginForm {...props} />}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ isLoggedIn: state.isLoggedIn }),
    { login }
)(Login);
