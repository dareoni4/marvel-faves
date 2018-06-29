import React from 'react';

/**
 * Display logged-in user's faves, likes and
 * dislikes.
 *
 * @return {Component}
 */
const Faves = () => {
    return (
        <div className="view-faves">
            <div className="wrap">
                <h1>My Characters</h1>
                <h2>Faves</h2>
                <h2>Likes</h2>
                <h2>Dislikes</h2>
            </div>
        </div>
    );
};

export default Faves;
