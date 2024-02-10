import { combineReducers } from 'redux'
import { LOGIN_SUCCESS, LOGOUT } from './actions'

const initialState = {
    isAuthenticated: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state
    }
}

export default combineReducers({
    auth: authReducer,
})
