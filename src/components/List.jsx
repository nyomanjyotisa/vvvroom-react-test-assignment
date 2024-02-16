import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Ticket from './Ticket'
import { useState } from 'react'
import AddTicket from './AddTicket'

const List = ({ name, tickets, status }) => {
    const [shouldShowAddTicketModal, setShouldShowAddTicketModal] =
        useState(false)

    return (
        <>
            <div className="w-full h-fit bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex justify-between px-4 py-4">
                    <p className="p-1 font-medium">{name}</p>
                </div>
                <div className="flex flex-col px-2 pb-2.5">
                    {tickets?.map((ticket) => (
                        <Ticket
                            ticket={ticket}
                            name={ticket.title}
                            id={ticket.id}
                            status={status}
                        ></Ticket>
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
