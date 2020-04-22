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
    UPDATE_UNITE_FAIL
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


export const tokenConfig = () => {
    const token = store.getState().user.token
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    return config;
}