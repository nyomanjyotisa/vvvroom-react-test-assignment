import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosInstance = axios.create()
const mock = new MockAdapter(axiosInstance)

mock.onPost('/login').reply((config) => {
    const { email, password } = JSON.parse(config.data)

    console.log(config.data)

    if (email === 'test@vroom.com.au' && password === 'frontendtest2024') {
        return [200, { message: 'Login successful' }]
    } else {
        return [401, { message: 'Invalid email or password' }]
    }
})

export default axiosInstance
