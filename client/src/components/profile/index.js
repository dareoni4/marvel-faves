import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import CharacterList from '../shared/CharacterList';

/**
 * Display logged-in user's faves, likes and
 * dislikes.
 *
 * @return {Component}
 */
const Profile = props => {
    const { isLoggedIn, username, faves, likes, dislikes } = props;

    if (!isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div className="view-profile">
            <div className="wrap">
                <h1>{username.charAt(0).toUpperCase() + username.slice(1)}</h1>
                <h2>
                    Faves
                    <span className="tagline">You love these characters.</span>
                </h2>
                {faves.length ? (
                    <CharacterList characters={faves} context="faves" />
                ) : (
                    <p className="no-items">No favorites.</p>
                )}
                <h2>
                    Likes
                    <span className="tagline">
                        You like these characters, but apparently don't love
                        them.
                    </span>
                </h2>
                {likes.length ? (
                    <CharacterList characters={likes} context="likes" />
                ) : (
                    <p className="no-items">No likes.</p>
                )}
                <h2>
                    Dislikes
                    <span className="tagline">
                        You hate these stupid characters.
                    </span>
                </h2>
                {dislikes.length ? (
                    <CharacterList characters={dislikes} context="dislikes" />
                ) : (
                    <p className="no-items">No dislikes.</p>
                )}
            </div>
        </div>
    );
};

export default connect(state => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    faves: state.faves,
    likes: state.likes,
    dislikes: state.dislikes
}))(Profile);
