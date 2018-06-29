import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

/**
 * Display logged-in user's faves, likes and
 * dislikes.
 *
 * @return {Component}
 */
const Profile = props => {
    const { isLoggedIn, username } = props;

    if (!isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="view-profile">
            <div className="wrap">
                <h1>{username}</h1>
                <h2>Profile</h2>
                <h2>Likes</h2>
                <h2>Dislikes</h2>
            </div>
        </div>
    );
};

export default connect(state => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username
}))(Profile);
