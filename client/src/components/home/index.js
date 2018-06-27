import React, { Component } from 'react';
import { marvel, cleanCharacters } from '../../utils/characters';
import SearchField from './SearchField';
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
                searchError: '',
                characters: []
            });
        }

        this.setState({ searchQuery: value });

        marvel.characters
            .findNameStartsWith(value)
            .then(response => {
                this.setState({
                    searchError: '',
                    characters: cleanCharacters(response.data)
                });
            })
            .catch(error => {
                this.setState({
                    searchError: 'An error occurred.',
                    characters: []
                });
            });
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const { searchQuery, characters } = this.state;

        return (
            <div className="view-home">
                <div className="wrap">
                    <SearchField
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    {searchQuery && <CharacterList characters={characters} />}
                </div>
            </div>
        );
    }
}

export default Home;
