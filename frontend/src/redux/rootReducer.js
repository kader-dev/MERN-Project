import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import errorReducer from './error/errorReducer'

export default combineReducers({
    user: userReducer,
    error: errorReducer
})


