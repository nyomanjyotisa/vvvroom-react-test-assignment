import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import SubmitButton from '../components/buttons/SubmitButton'
import { updateTicket } from '../actions/ticketActions'

function TicketDetail() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate()
    const { id } = useParams()
    const ticket = useSelector((state) => state.tickets).tickets.find(
        (ticket) => ticket.id == id
    )
    const [title, setTitle] = useState(ticket.title)
    const [description, setDescription] = useState(ticket.description)
    const [status, setStatus] = useState(ticket.status)
    const [error, setError] = useState('')
    const [shouldOpenEditForm, setShouldOpenEditForm] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    const getStatusReadable = (status) => {
        switch (status) {
            case 'open':
                return 'Open'
            case 'in-progress':
                return 'In Progress'
            case 'completed':
                return 'Completed'
            default:
                return ''
        }
    }

    const handleSubmit = async () => {
        try {
            const newTicket = {
                id: ticket.id,
                title,
                description,
                status,
                created: ticket.created,
            }

            await dispatch(updateTicket(newTicket))
            setShouldOpenEditForm(false)
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
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="my-5 mx-5 md:mx-auto max-w-screen-xl h-fit bg-white border border-gray-200 rounded-lg shadow">
                {!shouldOpenEditForm && (
                    <div>
                        <div className="flex flex-col px-2 pb-2.5 m-5">
                            <div className="flex justify-left">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    {ticket.title}
                                </h5>
                                <div>
                                    <button
                                        onClick={() =>
                                            setShouldOpenEditForm(true)
                                        }
                                        type="button"
                                        className="w-20 ml-2 mt-1 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:text-sm"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                            <p>
                                in list{' '}
                                <span className="font-medium">
                                    {getStatusReadable(ticket.status)}
                                </span>
                            </p>
                            <p>
                                created at{' '}
                                <span className="font-medium">
                                    {new Date(ticket.created).toLocaleString()}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col px-2 pb-2.5 m-5">
                            <h6 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
                                Description
                            </h6>
                            <div>{ticket.description}</div>
                        </div>
                    </div>
                )}

                {shouldOpenEditForm && (
                    <div className="flex flex-col px-2 pb-2.5 m-5">
                        <div className="text-left space-y-4">
                            <h3 className="text-2xl leading-6 font-bold text-gray-900">
                                Edit Ticket
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
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:bg-white"
                                        placeholder="Enter ticket Description"
                                    ></textarea>
                                </div>

                                <div>
                                    <label
                                        for="message"
                                        class="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Status
                                    </label>
                                    <select
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option value="open">Open</option>
                                        { status != 'completed' && <option value="in-progress">
                                            In Progress
                                        </option> }
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex mt-5">
                                <button
                                    onClick={() => setShouldOpenEditForm(false)}
                                    type="button"
                                    className="w-24 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white font-medium text-gray-900 border-gray-500 border-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-3 md:mr-0 text-sm"
                                >
                                    Cancel
                                </button>

                                <SubmitButton
                                    onClick={() => handleSubmit()}
                                    type="button"
                                >
                                    Submit
                                </SubmitButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TicketDetail
