import axios from "axios";
import {
    GET_DEPARTMENTS,
    DEPARTMENTS_LOADING,
    ADD_DEPARTMENT,
    DELETE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT_FAIL,
    ADD_DEPARTMENT_FAIL,
    UPDATE_DEPARTMENT_FAIL
} from './departmentTypes'
import { returnErrors } from '../error/errorActions'
import store from '../store'

export const getDepartments = () => dispatch => {
    dispatch(setDepartmentsLoading());
    axios.get('http://localhost:4000/department')
        .then(
            res => dispatch({
                type: GET_DEPARTMENTS,
                payload: res.data
            })
        )
        .catch(e =>
            dispatch(returnErrors(e.response.data, e.response.status))
        )
}



export const addDepartment = (department) => dispatch => {
    axios.post('http://localhost:4000/department', department)
        .then(
            res => dispatch({
                type: ADD_DEPARTMENT,
                payload: res.data
            })
        )
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'ADD_DEPARTMENT_FAIL'));
            dispatch({
                type: ADD_DEPARTMENT_FAIL
            })
        })
}

export const updateDepartment = ({ id, name, manager, description }) => dispatch => {
    axios.patch(`http://localhost:4000/department/${id}`, ({ name, manager, description }))
        .then(
            res => dispatch({
                type: UPDATE_DEPARTMENT,
                payload: res.data
            })
        )
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'ADD_DEPARTMENT_FAIL'));
            dispatch({
                type: UPDATE_DEPARTMENT_FAIL
            })
        })
}

export const deleteDepartment = id => dispatch => {
    dispatch(setDepartmentsLoading());
    axios.delete(`http://localhost:4000/department/${id}`)
        .then(
            res => dispatch({
                type: DELETE_DEPARTMENT,
                payload: id
            })
        )
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status, 'ADD_DEPARTMENT_FAIL'));
            dispatch({
                type: DELETE_DEPARTMENT_FAIL
            })
        })
}


export const setDepartmentsLoading = () => {
    return {
        type: DEPARTMENTS_LOADING
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
