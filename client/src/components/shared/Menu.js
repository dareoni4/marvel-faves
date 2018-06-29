import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutLink from './LogoutLink';

const Menu = props => {
    const { isLoggedIn } = props;

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoggedIn ? (
                    <React.Fragment>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <LogoutLink />
                        </li>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </React.Fragment>
                )}
            </ul>
        </nav>
    );
};

export default connect(state => ({ isLoggedIn: state.isLoggedIn }))(Menu);
