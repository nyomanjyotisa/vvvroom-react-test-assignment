import { useState } from 'react'
import Input from './components/Input'
import Button from './components/Button'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log('handleSubmit')
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded shadow-lg md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4">
                        <h1 className="text-lg text-center font-medium text-gray-900">
                            Log in to continue
                        </h1>
                        <form className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Enter your email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
