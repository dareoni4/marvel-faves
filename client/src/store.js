import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

/**
 * Set up axios instance that already
 * has the user's token stored.
 */
const authorized = axios.create();

authorized.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Intial State

const initialState = {
    isLoggedIn: false,
    username: '',
    faves: [],
    likes: [],
    dislikes: []
};

// Action Types

const UPDATE_USER = 'UPDATE_USER'; // Happens with login() and verify().

const ADD_FAVE = 'ADD_FAVE';

const REMOVE_FAVE = 'REMOVE_FAVE';

const ADD_LIKE = 'ADD_LIKE';

const REMOVE_LIKE = 'REMOVE_LIKE';

const ADD_DISLIKE = 'ADD_DISLIKE';

const REMOVE_DISLIKE = 'REMOVE_DISLIKE';

// Reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            // action.user
            return;
        case ADD_FAVE:
            // action.character
            return;
        case REMOVE_FAVE:
            // action.id
            return;
        case ADD_LIKE:
            // action.character
            return;
        case REMOVE_LIKE:
            // action.id
            return;
        case ADD_DISLIKE:
            // action.character
            return;
        case REMOVE_DISLIKE:
            // action.id
            return;
        default:
            return state;
    }
}

// Actions

/**
 * Log in user and get back user data
 * and token.
 */
export function login() {
    return dispatch => {
        // axios.post() ...
        /*
        dispatch({
          type: UPDATE_USER,
          user
        });
        */
    };
}

/**
 * Verify user who is already logged in
 * and get back current user data.
 */
export function verify() {
    return dispatch => {
        // authorized.get() ...
        /*
        dispatch({
          type: UPDATE_USER,
          user
        });
        */
    };
}

/**
 * Add a character to favorites.
 *
 * @param {Object} character
 * @param {String} character.id
 * @param {String} character.name
 * @param {String} character.experience
 * @param {String} character.height
 * @param {String} character.weight
 */
export function addFave(character) {
    // authorized.put() ...
    /*
    dispatch({
        type: ADD_FAVE,
        character
    });
    */
}

/**
 * Remove a character to favorites.
 *
 * @param {String} characterId ID of character to remove.
 */
export function removeFave(id) {
    // authorized.put() ...
    /*
    dispatch({
        type: REMOVE_FAVE,
        id
    });
    */
}

/**
 * Add a character to likes.
 *
 * @param {Object} character
 * @param {String} character.id
 * @param {String} character.name
 * @param {String} character.experience
 * @param {String} character.height
 * @param {String} character.weight
 */
export function addLike(character) {
    // authorized.put() ...
    /*
    dispatch({
        type: ADD_LIKE,
        character
    });
    */
}

/**
 * Remove a character to likes.
 *
 * @param {String} characterId ID of character to remove.
 */
export function removeLike(id) {
    // authorized.put() ...
    /*
    dispatch({
        type: REMOVE_LIKE,
        id
    });
    */
}

/**
 * Add a character to dislikes.
 *
 * @param {Object} character
 * @param {String} character.id
 * @param {String} character.name
 * @param {String} character.experience
 * @param {String} character.height
 * @param {String} character.weight
 */
export function addDislike(character) {
    // authorized.put() ...
    /*
    dispatch({
        type: ADD_DISLIKE,
        character
    });
    */
}

/**
 * Remove a character to dislikes.
 *
 * @param {String} characterId ID of character to remove.
 */
export function removeDislike(id) {
    // authorized.put() ...
    /*
    dispatch({
        type: REMOVE_DISLIKE,
        id
    });
    */
}

/**
 * Set up store.
 */
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

/**
 * Export store.
 */
export default store;
