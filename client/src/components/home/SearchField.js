import React from 'react';

/**
 * Display the main search field of
 * the homepage.
 *
 * @param {Object} props          Component properties.
 * @param {Object} props.value    Current value
 * @param {Object} props.onChange Component properties.
 */
const SearchField = props => {
    const { value, onChange } = props;
    return (
        <div className="search-field">
            <h1 className="search-title">Marvel Character Search</h1>
            <input type="search" value={value} onChange={onChange} />
        </div>
    );
};

export default SearchField;
