import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store';

/**
 * Logout Link
 */
class LogoutLink extends Component {
    /**
     * Handle dispatching logout to the
     * store.
     */
    handleLogout = event => {
        event.preventDefault();
        this.props.logout();
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <a href="#logout" title="Log Out" onClick={this.handleLogout}>
                Log Out
            </a>
        );
    }
}

export default connect(
    null,
    { logout }
)(LogoutLink);
