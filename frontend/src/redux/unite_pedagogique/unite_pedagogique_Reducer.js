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


const initialState = {
    unites: [],
    loading: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_UNITES:
            return {
                ...state,
                unites: action.payload,
                loading: false
            };
        case ADD_UNITE:
            return {
                ...state,
                unites: [action.pauload, ...state.unites]
            };
        case DELETE_UNITE:
            return {
                ...state,
                unites: state.unites.filter(u => action.payload.id !== u._id)
            }
        case UPDATE_UNITE:
            return {
                ...state,
                unites: [action.pauload, ...state.unites]
            };
        case GET_ALL_UNITES_FAIL:
        case GET_ONE_UNITE_FAIL:
        case DELETE_UNITE_FAIL:
        case ADD_UNITE_FAIL:
        case UPDATE_UNITE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}