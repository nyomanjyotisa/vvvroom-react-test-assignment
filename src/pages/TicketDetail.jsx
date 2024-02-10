import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function TicketDetail() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    return (
        <>
            <Navbar />

            <div>Ticket Detail {id}</div>
        </>
    )
}

export default TicketDetail
