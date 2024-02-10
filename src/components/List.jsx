import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Ticket from './Ticket'
import { useState } from 'react'
import Input from './Input'
import AddTicket from './AddTicket'

const List = ({ name, tickets, status }) => {
    const [shouldShowAddTicketModal, setShouldShowAddTicketModal] =
        useState(false)

    return (
        <>
            <div className="w-full h-fit bg-white border border-gray-200 rounded-lg shadow my-5">
                <div className="flex justify-between px-4 py-4">
                    <p className="p-1 font-medium">{name}</p>
                    <button
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
                    <div
                        id="dropdown"
                        className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                    >
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Export Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col px-2 pb-2.5">
                    {tickets?.map((ticket) => (
                        <Ticket name={ticket.title}></Ticket>
                    ))}

                    <button
                        onClick={() => setShouldShowAddTicketModal(true)}
                        className="text-gray-600 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add a ticket
                    </button>
                </div>
            </div>
            {shouldShowAddTicketModal && (
                <AddTicket
                    name={name}
                    status={status}
                    setShouldShowAddTicketModal={setShouldShowAddTicketModal}
                ></AddTicket>
            )}
        </>
    )
}

export default List
