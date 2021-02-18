import React from 'react'

import api from './../api/api'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    async function userLogin(body) {
        api.defaults.headers.post['Content-Type'] = 'application/json'
        await api.post('jwt-auth/v1/token', JSON.stringify(body))
        .then(res => {
            const { token } = res.data
            window.localStorage.setItem('token', token);
            getUser(token)
        })
        .catch(error => setError(error.response.data.message))
    }
    
    async function getUser(token) {
        api.defaults.headers.get['Authorization'] = `Bearer ${token}`
        await api.get('api/user')
        .then(res => {
            setData(res.data)
            setLogin(true)
        })
        .catch(error => setError(error.response.data.message))
    }
    

    return (
        <UserContext.Provider value={{ userLogin, getUser, data }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
