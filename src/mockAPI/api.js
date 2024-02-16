import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosInstance = axios.create()
const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 })

mock.onPost('/login').reply((config) => {
    const { email, password } = JSON.parse(config.data)

    if (email === 'test@vroom.com.au' && password === 'frontendtest2024') {
        return [200, { message: 'Login successful' }]
    } else {
        return [401, { message: 'Invalid email or password' }]
    }
})

mock.onPost('/logout').reply(() => {
    return [200, { message: 'Logout successful' }]
})

mock.onGet('/tickets').reply(200, {
    tickets: [
        {
            id: 1,
            title: 'Ticket 1',
            description: 'Description for ticket 1',
            status: 'open',
            created: Date.now(),
        },
        {
            id: 2,
            title: 'Ticket 2',
            description: 'Description for ticket 2',
            status: 'in-progress',
            created: Date.now(),
        },
        {
            id: 3,
            title: 'Ticket 3',
            description: 'Description for ticket 3',
            status: 'completed',
            created: Date.now(),
        },
    ],
})

mock.onPost('/ticket').reply((config) => {
    const { title, description } = JSON.parse(config.data)

    if (title == '' && description == '') {
        return [401, { message: 'All fields required' }]
    } else {
        return [200, { message: 'Add ticket success' }]
    }
})

mock.onPut('/ticket').reply((config) => {
    const { id, title, description } = JSON.parse(config.data)

    if (id && title !== '' && description !== '') {
        return [200, { message: 'Update ticket success' }]
    } else {
        return [401, { message: 'All fields required' }]
    }
})

mock.onDelete('/ticket').reply(() => {
    return [200, { message: 'Delete ticket success' }];
});

export default axiosInstance
