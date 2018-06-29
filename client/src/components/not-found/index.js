import React from 'react';

/**
 * Display not-found view, when no route
 * exists.
 *
 * @return {Component}
 */
const NotFound = () => {
    return (
        <div className="view-not-found">
            <div className="wrap">
                <h1>Page Not Found</h1>
                <p>{"Oops! The page you're looking for doesn't exist."}</p>
            </div>
        </div>
    );
};

export default NotFound;
