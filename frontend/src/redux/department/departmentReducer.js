import { GET_DEPARTMENTS, DEPARTMENTS_LOADING } from './departmentTypes'

const initialState = {
    departments: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEPARTMENTS:
            localStorage.setItem('items', JSON.stringify(action.payload))
            return {
                ...state,
                departments: action.payload,
                loading: false
            };
        case DEPARTMENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }

}