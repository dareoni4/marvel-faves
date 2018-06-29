import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

/**
 * Set up axios instance that already
 * has the user's token stored.
 */
const authorized = axios.create();

authorized.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

// Intial State

const initialState = {
    isLoading: true,
    isLoggedIn: false,
    username: '',
    email: '',
    faves: [],
    likes: [],
    dislikes: []
};

// Action Types

const AUTHENTICATE = 'AUTHENTICATE'; // Happens with login() and verify().

const STOP_LOADING = 'STOP_LOADING';

const LOGOUT = 'LOGOUT';

const ADD_FAVE = 'ADD_FAVE';

const REMOVE_FAVE = 'REMOVE_FAVE';

const ADD_LIKE = 'ADD_LIKE';

const REMOVE_LIKE = 'REMOVE_LIKE';

const ADD_DISLIKE = 'ADD_DISLIKE';

const REMOVE_DISLIKE = 'REMOVE_DISLIKE';

// Reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                ...action.user
            };
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case LOGOUT:
            return {
                ...initialState,
                isLoading: false
            };
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
 * Register a new user.
 *
 * Get your free login tokens here!
 *
 * @param {Object} data          Data submitted from form.
 * @param {String} data.username Username.
 * @param {String} data.email    Email.
 * @param {String} data.password Password.
 */
export function register(data) {
    return dispatch => {
        return axios.post('/auth/register', data).then(response => {
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: AUTHENTICATE,
                user: response.data.user
            });
        });
    };
}

/**
 * Log in user and get back user data
 * and token.
 *
 * @param {Object} data          Data submitted from form.
 * @param {String} data.username Username.
 * @param {String} data.password Password.
 */
export function login(credentials) {
    return dispatch => {
        return axios.post('/auth/login', credentials).then(response => {
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: AUTHENTICATE,
                user: response.data.user
            });
        });
    };
}

/**
 * Verify user who is already logged in
 * and get back current user data.
 */
export function verify() {
    return dispatch => {
        if (!localStorage.getItem('token')) {
            dispatch({
                type: STOP_LOADING
            });
            return;
        }

        return authorized
            .get('/auth/verify')
            .then(response => {
                dispatch({
                    type: AUTHENTICATE,
                    user: response.data.user
                });
            })
            .catch(error => {
                dispatch({
                    type: STOP_LOADING
                });
            });
    };
}

/**
 * Log out user.
 *
 * This resets auth state and delete token.
 */
export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT
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
