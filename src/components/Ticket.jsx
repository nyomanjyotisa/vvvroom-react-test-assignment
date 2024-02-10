import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Ticket = ({ name, id, status }) => {
    const navigate = useNavigate()
    const [shouldMenuOpen, setShouldMenuOpen] = useState(false)

    const handleNavigation = () => {
        const route = `/ticket/${id}`
        navigate(route)
    }

    const toggleMenu = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShouldMenuOpen(!shouldMenuOpen)
    }

    const renderMenuOption = () => {
        switch (status) {
            case 'open':
                return (
                    <ul>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Move to In Progress
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Move to Completed
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Delete
                        </li>
                    </ul>
                )
            case 'in-progress':
                return (
                    <ul>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Move to Open
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Move to Completed
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Delete
                        </li>
                    </ul>
                )
            case 'completed':
                return (
                    <ul>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Move to Open
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                            Delete
                        </li>
                    </ul>
                )
            default:
                return null
        }
    }

    return (
        <button
            onClick={handleNavigation}
            className="w-full bg-white rounded-lg mb-2 hover:bg-gray-50"
        >
            <div className="flex justify-between px-4 py-4 border rounded-lg relative">
                <p className="p-1">{name}</p>
                <div>
                    <button
                        onClick={toggleMenu}
                        id="dropdownButton"
                        data-dropdown-toggle="dropdown"
                        className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                        type="button"
                    >
                        <span className="sr-only">Open dropdown</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                        >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                    </button>
                    {shouldMenuOpen && (
                        <div className="z-50 absolute text-left top-0 right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                            <div className="w-full text-right">
                                <button
                                    onClick={toggleMenu}
                                    className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm py-1.5 px-3 m-1.5"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            {renderMenuOption()}
                        </div>
                    )}
                </div>
            </div>
        </button>
    )
}

export default Ticket
