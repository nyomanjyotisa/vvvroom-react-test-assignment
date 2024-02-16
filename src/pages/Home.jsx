import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import List from '../components/List'
import { useDispatch, useSelector } from 'react-redux'
import { readTickets } from '../actions/ticketActions'
import axiosInstance from '../mockAPI/api'

function Home() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate()

    console.log(
        useSelector((state) => state),
        'state'
    )

    const lol = async () => {
        const response = await axiosInstance.get('/tickets')

        console.log(response, 'response')
    }

    const dispatch = useDispatch()
    const tickets = useSelector((state) => state.tickets).tickets

    useEffect(() => {
        lol()
    }, [])

    useEffect(() => {
        dispatch(readTickets())
    }, [dispatch])

    console.log(tickets, 'tickets')

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="grid md:grid-cols-3 gap-4 max-w-screen-xl mx-5 xl:mx-auto my-5">
                <List
                    name="Open"
                    status="open"
                    tickets={tickets?.filter(
                        (ticket) => ticket.status === 'open'
                    )}
                ></List>
                <List
                    name="In Progress"
                    status="in-progress"
                    tickets={tickets?.filter(
                        (ticket) => ticket.status === 'in-progress'
                    )}
                ></List>
                <List
                    name="Completed"
                    status="completed"
                    tickets={tickets?.filter(
                        (ticket) => ticket.status === 'completed'
                    )}
                ></List>
            </div>
        </div>
    )
}

export default Home
