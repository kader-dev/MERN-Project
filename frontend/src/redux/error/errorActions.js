import { CLEAR_ERRORS, GET_ERRORS } from './errorTypes'


//return errors
export const returnErrors = (message, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { message, status, id }
    }
}



//clear
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}