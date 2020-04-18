import axios from "axios";
import {
    GET_DEPARTMENTS,
    DEPARTMENTS_LOADING,
    ADD_DEPARTMENTS,
    DELETE_DEPARTMENTS,
    UPDATE_DEPARTMENTS
} from './departmentTypes'
import { returnErrors } from '../error/errorActions'


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
                type: ADD_DEPARTMENTS,
                payload: res.data
            })
        )
        .catch(e =>
            dispatch(returnErrors(e.response.data, e.response.status))
        )
}

export const updateDepartment = ({ id, name, manager, description }) => dispatch => {
    axios.patch(`http://localhost:4000/department/${id}`, ({ name, manager, description }))
        .then(
            res => dispatch({
                type: UPDATE_DEPARTMENTS,
                payload: res.data
            })
        ).then(console.log({ name, manager, description }))
        .catch(e =>
            dispatch(returnErrors(e.response.data, e.response.status))
        )
}

export const deleteDepartment = id => dispatch => {
    dispatch(setDepartmentsLoading());
    axios.delete(`http://localhost:4000/department/${id}`)
        .then(
            res => dispatch({
                type: DELETE_DEPARTMENTS,
                payload: id
            })
        )
        .catch(e =>
            dispatch(returnErrors(e.response.data, e.response.status))
        )
}

export const setDepartmentsLoading = () => {
    return {
        type: DEPARTMENTS_LOADING
    }
}