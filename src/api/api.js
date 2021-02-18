import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dogsapi.origamid.dev/json/',
})

export async function getToken(body) {
    api.defaults.headers.post['Content-Type'] = 'application/json'
    const response = await api.post('jwt-auth/v1/token', JSON.stringify(body))
    .then(res =>res.data)
    .catch(error => ({error: error.response.data.code, message: error.response.data.message}))
    return response;
}

export async function getUser(token) {
    api.defaults.headers.get['Authorization'] = `Bearer ${token}`
    const response = await api.get('api/user')
    .then(res =>res.data)
    .catch(error => ({error: error.response.data.code, message: error.response.data.message}))
    return response;
}

export default api;