import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'

const Ticket = ({ ticket, name, id, status }) => {
    const navigate = useNavigate()
    const [shouldMenuOpen, setShouldMenuOpen] = useState(false)
    const menuRef = useRef(null)

    const handleNavigation = () => {
        const route = `/ticket/${id}`
        navigate(route)
    }

    const toggleMenu = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setShouldMenuOpen(!shouldMenuOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShouldMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuRef])

    const menuOptions = () => {
        switch (status) {
            case 'open':
                return ['Move to In Progress', 'Move to Completed', 'Delete']
            case 'in-progress':
                return ['Move to Open', 'Move to Completed', 'Delete']
            case 'completed':
                return ['Move to Open', 'Delete']
            default:
                return []
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
                        <DropdownMenu
                            ref={menuRef}
                            ticket={ticket}
                            options={menuOptions()}
                            onClose={toggleMenu}
                        />
                    )}
                </div>
            </div>
        </button>
    )
}

export default Ticket
