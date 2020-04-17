import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import errorReducer from './error/errorReducer'
import departmentReducer from './department/departmentReducer'

export default combineReducers({
    user: userReducer,
    error: errorReducer,
    department: departmentReducer
})


