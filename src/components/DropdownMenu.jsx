import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import MenuOption from './MenuOption'
import React, { forwardRef } from 'react'

const DropdownMenu = forwardRef(({ ticket, options, onClose }, ref) => {
    return (
        <div
            ref={ref}
            className="z-50 absolute text-left top-0 right-0 w-auto max-w-60 bg-white shadow-md rounded-md flex flex-row-reverse"
        >
            <div className="text-right">
                <button
                    onClick={onClose}
                    className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm py-1.5 px-3 m-1.5"
                    type="button"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <ul>
                {options.map((option, index) => (
                    <MenuOption key={index} ticket={ticket}>
                        {option}
                    </MenuOption>
                ))}
            </ul>
        </div>
    )
})

export default DropdownMenu
