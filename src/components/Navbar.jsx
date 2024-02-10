import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../actions'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header className="shadow-md">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">
                            VVVroom Kanban
                        </span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <button
                            onClick={handleLogout} // Call handleLogout on button click
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
