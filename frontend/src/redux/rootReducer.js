import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import errorReducer from './error/errorReducer'
import departmentReducer from './department/departmentReducer'
import unitesReducer from './unite_pedagogique/unite_pedagogique_Reducer'
export default combineReducers({
    user: userReducer,
    error: errorReducer,
    department: departmentReducer,
    unite: unitesReducer
})


