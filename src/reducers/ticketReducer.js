import {
    CREATE_TICKET,
    READ_TICKETS,
    UPDATE_TICKET,
    DELETE_TICKET,
} from '../actions/ticketActions'

const initialState = {
    tickets: [],
}

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
            }
        case READ_TICKETS:
            return {
                ...state,
                tickets: [...state.tickets, ...action.payload],
            }
        case UPDATE_TICKET:
            return {
                ...state,
                tickets: state.tickets.map((ticket) =>
                    ticket.id === action.payload.id ? action.payload : ticket
                ),
            }
        case DELETE_TICKET:
            return {
                ...state,
                tickets: state.tickets.filter(
                    (ticket) => ticket.id !== action.payload
                ),
            }
        default:
            return state
    }
}

export default ticketReducer
