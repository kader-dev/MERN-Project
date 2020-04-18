import axios from "axios";
import { GET_DEPARTMENTS, DEPARTMENTS_LOADING, ADD_DEPARTMENTS } from './departmentTypes'
import { returnErrors } from '../error/errorActions'
import Department from "../../views/Departments/Department";

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


export const addDepartment = department => dispatch => {

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


export const setDepartmentsLoading = () => {
    return {
        type: DEPARTMENTS_LOADING
    }
}