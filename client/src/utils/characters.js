import marvelApi from 'marvel-api';

/**
 * Wrapper for connecting to the
 * Marvel API.
 */
export const marvel = marvelApi.createClient({
    publicKey: '3cd86a29e3a7f0350cc616363e0d541f',
    privateKey: 'd91ee85589c7d00681bb53610638486020342e6d'
});

/**
 * Format characters from API request
 * to be saved to state.
 *
 * @param {Array} characters Array of characters from raw API response.
 * @return {Array} Formatted array of characters.
 */
export function cleanCharacters(characters) {
    return characters.map(function(character) {
        const wikiLink = character.urls.find(link => link.type === 'wiki');
        const { path, extension } = character.thumbnail;
        return {
            id: character.id,
            name: character.name,
            comicsNum: character.comics.available,
            seriesNum: character.series.available,
            storiesNum: character.stories.available,
            link: wikiLink ? wikiLink.url : '',
            thumb: `${path}.${extension}`
        };
    });
}
