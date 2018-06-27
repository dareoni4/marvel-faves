import React from 'react';
import Character from '../shared/Character';

/**
 * Display the main search results on
 * the homepage.
 *
 * @param {Object} props            Component properties.
 * @param {Array}  props.characters Items produced from search query.
 */
const CharacterList = props => {
    const { characters } = props;

    if (!characters.length) {
        return null;
    }

    return (
        <div className="characters-list">
            <ul>
                {characters.map(character => {
                    return (
                        <Character
                            key={character.id}
                            id={character.id}
                            name={character.name}
                            thumb={character.thumb}
                            link={character.link}
                            comicsNum={character.comicsNum}
                            seriesNum={character.seriesNum}
                            storiesNum={character.storiesNum}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default CharacterList;
