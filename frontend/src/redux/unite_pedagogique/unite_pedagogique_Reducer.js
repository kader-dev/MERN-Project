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
    UPDATE_UNITE_FAIL,
    UNITES_LOADING
} from './unite_pedagogique_Types'


const initialState = {
    unites: [],
    loading: false,
    succes: null,
    update: null,
    unite: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_UNITES:
            return {
                ...state,
                unites: action.payload,
                loading: false,
                succes: null,
                update: null
            };
        case GET_ONE_UNITE:
            return {
                ...state,
                unite: action.payload,
            };
        case ADD_UNITE:
            return {
                ...state,
                unites: [action.payload, ...state.unites],
                succes: true
            };
        case DELETE_UNITE:
            return {
                ...state,
                unites: state.unites.filter(u => action.payload !== u._id)
            }
        case UPDATE_UNITE:
            return {
                ...state,
                unites: action.payload,
                update: true
            };
        case UNITES_LOADING:
            return {
                ...state,
                loading: true,
                succes: null
            }
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