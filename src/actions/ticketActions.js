import axiosInstance from '../mockAPI/api'

export const CREATE_TICKET = 'CREATE_TICKET'
export const READ_TICKETS = 'READ_TICKETS'
export const UPDATE_TICKET = 'UPDATE_TICKET'
export const DELETE_TICKET = 'DELETE_TICKET'

export const createTicket = (ticket) => {
    return async (dispatch) => {
        await axiosInstance.post('/ticket', ticket);
        dispatch({
            type: CREATE_TICKET,
            payload: ticket,
        });
    };
};

export const readTickets = () => {
    return async (dispatch, getState) => {
        const { tickets } = getState()
        if (tickets.tickets.length > 0) {
            return
        }

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

export const updateTicket = (ticket) => {
    return async (dispatch) => {
        await axiosInstance.put('/ticket', ticket)
        dispatch({
            type: UPDATE_TICKET,
            payload: ticket,
        })
    }
}

export const deleteTicket = (ticketId) => {
    return async (dispatch) => {
        try {
            await axiosInstance.delete(`/ticket`);
            dispatch({
                type: DELETE_TICKET,
                payload: ticketId,
            });
        } catch (error) {
            alert('Delete Ticket Error:' + error);
        }
    };
};
