import { combineReducers } from 'redux'
import ticketReducer from './ticketReducer'
import authReducer from './authReducer'

export default combineReducers({
    auth: authReducer,
    tickets: ticketReducer,
})
