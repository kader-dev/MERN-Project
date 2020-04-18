import { GET_DEPARTMENTS, DEPARTMENTS_LOADING, ADD_DEPARTMENTS } from './departmentTypes'

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
        case DEPARTMENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }

}