import axios from "axios";
import {
    GET_ALL_UNITES,
    GET_ONE_UNITE,
    DELETE_UNITE,
    ADD_UNITE,
    UPDATE_UNITE,
    GET_ALL_UNITES_FAIL,
    GET_ONE_UNITE_FAIL,
    DELETE_UNITE_FAIL,
    ADD_UNITE_FAIL,
    UPDATE_UNITE_FAIL,
    UNITES_LOADING
} from './unite_pedagogique_Types'
import store from '../store'
import { returnErrors } from '../error/errorActions'
import { toast } from "react-toastify";

export const getUnites = () => dispatch => {
    axios.get('http://localhost:4000/unite_pedagogique/unites')
        .then(
            res => dispatch({
                type: GET_ALL_UNITES,
                payload: res.data
            })
        )
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'GET_ALL_UNITES_FAIL'));
            dispatch({
                type: GET_ALL_UNITES_FAIL
            })
        })
}

export const getUnitesDepartment = () => dispatch => {
    axios.get('http://localhost:4000/unite_pedagogique/my', tokenConfig())
        .then(
            res => dispatch({
                type: GET_ALL_UNITES,
                payload: res.data
            })
        )
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'GET_ALL_UNITES_FAIL'));
            dispatch({
                type: GET_ALL_UNITES_FAIL
            })
        })
}

export const getMyUnite = () => dispatch => {
    axios.get('http://localhost:4000/unite_pedagogique/my/unite', tokenConfig())
        .then(
            res => dispatch({
                type: GET_ONE_UNITE,
                payload: res.data
            })
        ).then(res=>console.log(res.payload[0].list_Teachers[0]))
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'GET_ONE_UNITE_FAIL'));
            dispatch({
                type: GET_ONE_UNITE_FAIL
            })
        })
}

export const getUnite = (name) => dispatch => {
    axios.get(`http://localhost:4000/unite_pedagogique/unite/${name}`)
        .then(
            res => dispatch({
                type: GET_ONE_UNITE,
                payload: res.data
            })
        )
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'GET_ONE_UNITE_FAIL'));
            dispatch({
                type: GET_ONE_UNITE_FAIL
            })
        })
}

export const addUnite = Unite => dispatch => {
    axios.post('http://localhost:4000/unite_pedagogique', Unite, tokenConfig())
        .then(
            res => dispatch({
                type: ADD_UNITE,
                payload: res.data
            }),
        )
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'ADD_UNITE_FAIL'));
            dispatch({
                type: ADD_UNITE_FAIL
            })
        })
}

export const deleteUnite = (id) => dispatch => {
    axios.delete(`http://localhost:4000/unite_pedagogique/${id}`, tokenConfig())
        .then(
            res => dispatch({
                type: DELETE_UNITE,
                payload: id
            })
        ).then(toast.success("DELETE SUCCESS"))
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'DELETE_UNITE_FAIL'));
            dispatch({
                type: DELETE_UNITE_FAIL
            })
        })
}

export const updateUnite = ({ id, name, manager, description }) => dispatch => {
    axios.patch(`http://localhost:4000/unite_pedagogique/${id}`, ({ name, manager, description }), tokenConfig())
        .then(
            res => dispatch({
                type: UPDATE_UNITE,
                payload: res.data
            })
        ).then(toast.success("UPDATE SUCCESS"))
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'UPDATE_UNITE_FAIL'));
            dispatch({
                type: UPDATE_UNITE_FAIL
            })
        })
}
export const setUnitesLoading = () => {
    return {
        type: UNITES_LOADING
    }
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