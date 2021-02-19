import React from 'react'

import api from './../api/api'

import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()

    async function userLogin(body) {
        try {
            setError(null)
            setLoading(true)
            api.defaults.headers.post['Content-Type'] = 'application/json'
            const response = await api.post('jwt-auth/v1/token', JSON.stringify(body))
            const { token } = response.data
            window.localStorage.setItem('token', token);
            await getUser(token)
            navigate('/conta')
        } catch (error) {
            const { message } = error.response.data
            setError(message)
            setLogin(false)
        } finally {
            setLoading(false)
        }
    }

    const userLogout = React.useCallback( async function () {        
        window.localStorage.removeItem('token')
        setData(null)
        setError(null)
        setLoading(false)
        setLogin(false)
        console.log(navigate)
        navigate('/login')
    })
    
    async function getUser(token) {
        api.defaults.headers.get['Authorization'] = `Bearer ${token}`
        try {
            const res = await api.get('api/user')
            setData(res.data)
            setLogin(true)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    React.useEffect(() => {
        const validateToken = async () => {
            const token = window.localStorage.getItem('token')
            if(token) {
                try {
                    setError(null)
                    setLoading(true)
                    api.defaults.headers.post['Authorization'] = `Bearer ${token}`
                    await api.post('jwt-auth/v1/token/validate')
                    await getUser(token)
                } catch (error) {
                    userLogout()
                } finally {
                    setLoading(false)
                }
            }
        }
        validateToken()
    }, [])
    

    return (
        <UserContext.Provider value={{ userLogin, getUser, userLogout, data, error, loading, login }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
