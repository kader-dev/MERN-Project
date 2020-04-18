import {
    GET_DEPARTMENTS,
    DEPARTMENTS_LOADING,
    ADD_DEPARTMENTS,
    DELETE_DEPARTMENTS,
    UPDATE_DEPARTMENTS
} from './departmentTypes'

const initialState = {
    departments: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
                loading: false
            };
        case ADD_DEPARTMENTS:
            return {
                ...state,
                departments: [action.payload, ...state.departments]
            }
        case DELETE_DEPARTMENTS:
            return {
                ...state,
                departments: state.departments.filter(dep => dep._id !== action.payload)
            }
        case UPDATE_DEPARTMENTS:
            return {
                ...state,
                departments: [action.payload, ...state.departments]
            }
        case DEPARTMENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }

}