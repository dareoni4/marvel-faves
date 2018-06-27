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
    return <input value={value} onChange={onChange} />;
};

export default SearchField;
