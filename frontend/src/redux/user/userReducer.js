import {
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from './userTypes'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: localStorage.getItem('user')
}


export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return {
                ...state,
                token: null,
                isLoading: false,
                user: null,
                isAuthenticated: false
            };
        default:
            return state
    }


}