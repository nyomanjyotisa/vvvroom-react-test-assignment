import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Input = ({ type, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-gray-50 focus:bg-white border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
                required
            />
            {type === 'password' && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-4 py-2 bg-transparent"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            )}
        </div>
    )
}

export default Input
