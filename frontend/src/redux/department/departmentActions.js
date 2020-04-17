import axios from "axios";
import { GET_DEPARTMENTS, DEPARTMENTS_LOADING } from './departmentTypes'
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

export const setDepartmentsLoading = () => {
    return {
        type: DEPARTMENTS_LOADING
    }
}