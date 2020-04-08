import axios from "axios";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './userTypes'
import { returnErrors } from '../error/errorActions'

export const register = ({ name, email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ name, email, password })
    axios.post('http://localhost:4000/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })

        })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ email, password })
    axios.post('http://localhost:4000/users', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })

        })
}



export const tokenConfig = getState => {
    //get token from localstorage
    const token = getState().auth.token;
    //headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config;
}
