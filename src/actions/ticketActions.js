import axiosInstance from '../mockAPI/api'

export const CREATE_TICKET = 'CREATE_TICKET'
export const READ_TICKETS = 'READ_TICKETS'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const DELETE_TICKET = 'DELETE_TICKET'

export const createTicket = (ticket) => ({
    type: CREATE_TICKET,
    payload: ticket,
})

export const readTickets = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get('/tickets')
            dispatch({
                type: READ_TICKETS,
                payload: response.data.tickets,
            })
        } catch (error) {
            alert('Read Tickets Error:' + error)
        }
    }
}

export const updateTicket = (ticket) => ({
    type: UPDATE_TICKET,
    payload: ticket,
})

export const deleteTicket = (id) => ({
    type: DELETE_TICKET,
    payload: id,
})
