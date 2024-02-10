import { useState, useEffect } from 'react'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import axios from '../mockAPI/api.js'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions.js'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setError('')

        try {
            const response = await axios.post('/login', {
                email,
                password,
            })
            console.log('Login successful', response.data)
            dispatch(login())
            navigate('/')
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message != ''
            ) {
                setError(error.response.data.message)
            } else {
                setError('An error occurred during login')
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded shadow-lg md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4">
                        <h1 className="text-lg text-center font-medium text-gray-900">
                            Log in to continue
                        </h1>
                        <form className="space-y-4">
                            <div
                                className={`${error ? 'p-2.5' : ''} text-sm text-red-800 rounded bg-red-100`}
                            >
                                {error}
                            </div>
                            <Input
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="button" onClick={handleSubmit}>
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
