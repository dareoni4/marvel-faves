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
    faves: []
};

// Action Types

const UPDATE_USER = 'UPDATE_USER';

const ADD_FAVE = 'ADD_FAVE';

const REMOVE_FAVE = 'REMOVE_FAVE';

// Reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
        // action.user
        case ADD_FAVE:
        // action.pokemon
        case REMOVE_FAVE:
        // action.id
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
 * Add a pokemon to favorites.
 *
 * @param {Object} pokemon
 * @param {String} pokemon.id
 * @param {String} pokemon.name
 * @param {String} pokemon.experience
 * @param {String} pokemon.height
 * @param {String} pokemon.weight
 */
export function addFave(pokemon) {
    // authorized.put() ...
    /*
    dispatch({
        type: ADD_FAVE,
        pokemon
    });
    */
}

/**
 * Add a pokemon to favorites.
 *
 * @param {String} pokemonId ID of pokemon to delete.
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
