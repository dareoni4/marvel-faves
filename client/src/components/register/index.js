import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from '../shared/Form';
import { register } from '../../store';
import RegisterForm from './RegisterForm';

/**
 * Display register view, to creae a
 * new user.
 *
 * @return {Component}
 */
class Register extends Component {
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
    handleRegister(inputs) {
        this.props.register(inputs).catch(error => {
            this.setState({
                error: error.response.data.message
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
            <div className="view-register">
                <div className="wrap">
                    <h1>Register</h1>
                    <Form
                        inputs={{ username: '', email: '', password: '' }}
                        error={error}
                        submit={inputs => this.handleRegister(inputs)}
                        render={props => <RegisterForm {...props} />}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ isLoggedIn: state.isLoggedIn }),
    { register }
)(Register);
