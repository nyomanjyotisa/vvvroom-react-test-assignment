import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/authActions'
import axiosInstance from '../mockAPI/api'
import LogoutButton from './buttons/LogoutButton'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout')
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            alert('Logout error: ' + error)
        }
    }

    return (
        <header className="shadow-md sticky top-0 bg-white z-50">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">
                            VVVroom Kanban
                        </span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <LogoutButton onClick={handleLogout}>
                            Log Out
                        </LogoutButton>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
