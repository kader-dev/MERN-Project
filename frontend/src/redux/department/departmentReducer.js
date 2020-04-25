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



const initialState = {
    departments: [],
    loading: false,
    succes: null,
    update:null,
    depart: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
                loading: false,
                succes: null,
                update:null
            };
        case ADD_DEPARTMENT:
            return {
                ...state,
                departments: [action.payload, ...state.departments],
                succes: true
            }
        case DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter(dep => dep._id !== action.payload)
            }
        case UPDATE_DEPARTMENT:
            return {
                ...state,
                departments: action.payload,
                update:true
            }
        case DEPARTMENTS_LOADING:
            return {
                ...state,
                loading: true,
                succes: null
            };
        case UPDATE_DEPARTMENT_FAIL:
        case DELETE_DEPARTMENT_FAIL:
        case ADD_DEPARTMENT_FAIL:
            return {
                ...state
            }
        default:
            return state
    }

}