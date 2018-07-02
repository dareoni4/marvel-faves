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

const ADD_ITEM = 'ADD_ITEM';

const REMOVE_ITEM = 'REMOVE_ITEM';

// Reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        // Add authenticated user credentials.
        case AUTHENTICATE:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                ...action.user
            };

        // Application is done loading.
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };

        // Log out current user.
        case LOGOUT:
            return {
                ...initialState,
                isLoading: false
            };

        // Add character to faves, likes, or dislikes.
        case ADD_ITEM:
            var items = [...state[action.itemType]];
            const character = action.character;

            if (!items.find(item => item.id === character.id)) {
                items.push(character);
            }

            return {
                ...state,
                [action.itemType]: items
            };

        // Remove character from faves, likes, or dislikes.
        case REMOVE_ITEM:
            var items = state[action.itemType].filter(
                item => item.id !== action.characterId
            );

            return {
                ...state,
                [action.itemType]: items
            };

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
                    user: response.data
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
 * Add a character to faves, likes or dislikes.
 *
 * @param {String} type                 Type of item to add, `faves`, `likes` or `dislikes`.
 * @param {String} userId               Current user ID.
 * @param {Object} character            Character to add.
 * @param {String} character.id
 * @param {String} character.name
 * @param {String} character.thumb
 * @param {String} character.link
 * @param {Number} character.comicsNum
 * @param {Number} character.seriesNum
 * @param {Number} character.storiesNum
 */
export function addItem(type, userId, character) {
    return dispatch => {
        authorized
            .post(`/users/${userId}/${type}`, character)
            .then(response => {
                dispatch({
                    type: ADD_ITEM,
                    itemType: type,
                    character
                });
            })
            .catch(error => {
                console.dir(error);
            });
    };
}

/**
 * Remove a character from faves, likes or dislikes.
 *
 * @param {String} type        Type of item to add, `faves`, `likes` or `dislikes`.
 * @param {String} userId      Current user ID.
 * @param {String} characterId Character ID to remove.
 */
export function removeItem(type, userId, characterId) {
    return dispatch => {
        authorized
            .delete(`/users/${userId}/${type}/${characterId}`)
            .then(response => {
                console.log(response);
                dispatch({
                    type: REMOVE_ITEM,
                    itemType: type,
                    characterId
                });
            })
            .catch(error => {
                console.dir(error);
            });
    };
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
