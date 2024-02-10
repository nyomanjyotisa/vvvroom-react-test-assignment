import React, { useState } from 'react'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { createTicket } from '../actions/ticketActions'
import axiosInstance from '../mockAPI/api'

const AddTicket = ({ name, status, setShouldShowAddTicketModal }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        try {
            const newTicket = {
                id: Math.floor(Math.random() * 100000000) + 1,
                title,
                description,
                status: status,
                created: new Date().getTime(),
            }

            const response = await axiosInstance.post('/ticket', newTicket)
            
            dispatch(createTicket(newTicket))
            setTitle('')
            setDescription('')
            setShouldShowAddTicketModal(false)
        } catch (error) {
            if (
                error?.response?.status === 401 &&
                error?.response?.data?.message != ''
            ) {
                setError(error.response.data.message)
            } else {
                setError('An error occurred: ' + error)
            }
        }
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4">
                        <div className="w-full">
                            <div className="text-center sm:text-left space-y-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Add Ticket <span className='font-normal'>({name})</span>
                                </h3>
                                <div className="mt-2 space-y-4">
                                    <div
                                        className={`${error ? 'p-2.5' : ''} text-sm text-red-800 rounded bg-red-100`}
                                    >
                                        {error}
                                    </div>
                                    <div>
                                        <label
                                            for="Title"
                                            class="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Title
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="Enter ticket title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="message"
                                            class="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            id="message"
                                            rows="4"
                                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter ticket Description"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={() => handleSubmit()}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Submit
                        </button>

                        <button
                            onClick={() => setShouldShowAddTicketModal(false)}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-900 border-gray-500 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTicket
