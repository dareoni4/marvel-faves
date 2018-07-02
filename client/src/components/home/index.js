import React, { Component } from 'react';
import { marvel, cleanCharacters } from '../../utils/characters';
import SearchField from './SearchField';
import Loader from '../shared/Loader';
import CharacterList from '../shared/CharacterList';

/**
 * Home View
 */
class Home extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            searchError: '',
            isSearching: false,
            characters: [] // Found characters.
        };
    }

    /**
     * Handle searching.
     */
    handleSearch = event => {
        const { value } = event.target;

        if (!value) {
            this.setState({
                isSearching: false,
                searchError: '',
                characters: []
            });
        }

        this.setState({ searchQuery: value, isSearching: true });

        marvel.characters
            .findNameStartsWith(value)
            .then(response => {
                const searchError = !response.data.length
                    ? 'No characters found.'
                    : '';
                this.setState({
                    searchError: searchError,
                    isSearching: false,
                    characters: cleanCharacters(response.data)
                });
            })
            .catch(error => {
                this.setState({
                    searchError: '', // Fail gracefully.
                    isSearching: false,
                    characters: []
                });
            });
    };

    /**
     * Render the search results.
     */
    renderResults = () => {
        const {
            searchQuery,
            searchError,
            isSearching,
            characters
        } = this.state;

        if (!searchQuery) {
            return null;
        }

        if (isSearching) {
            return <Loader />;
        }

        if (searchError) {
            return <p className="error">{searchError}</p>;
        }

        if (characters.length) {
            return <CharacterList characters={characters} context="search" />;
        }
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const { searchQuery } = this.state;

        return (
            <div className="view-home">
                <div className="wrap">
                    <SearchField
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    <div className="search-results">{this.renderResults()}</div>
                </div>
            </div>
        );
    }
}

export default Home;
