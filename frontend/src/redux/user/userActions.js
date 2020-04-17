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
import store from '../store'

export const register = ({ Fisrt_name, Last_name, email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ Fisrt_name, Last_name, email, password })
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

export const logout = () => dispatch => {

    const body = JSON.stringify({})
    axios.post('http://localhost:4000/users/logoutAll', body, tokenConfig())
        .then(res => dispatch({
            type: LOGOUT_SUCCESS
        }))
}

export const login = ({ email, password }) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const body = JSON.stringify({ email, password })
    axios.post('http://localhost:4000/users/login', body, config)
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



export const tokenConfig = () => {
    const token = store.getState().user.token

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    return config;
}
