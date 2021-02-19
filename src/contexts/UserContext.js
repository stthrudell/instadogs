import React from 'react'

import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './../api/api'

import { useNavigate } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)

    const { loading, error, request} = useFetch()

    const navigate = useNavigate()

    async function userLogin(username, password) {
        const { url, options } = TOKEN_POST({username, password})
        const { response, json } = await request(url, options);
        if(response.ok === true){
            window.localStorage.setItem('token', json.token);
            await getUser(json.token)
            navigate('/conta')
        }
    }

    const userLogout = React.useCallback( async function () {        
        window.localStorage.removeItem('token')
        setData(null)
        setLogin(false)
        navigate('/login')
    }, [navigate])
    
    const getUser = React.useCallback( async function (token) {
        const { url, options } = USER_GET(token)
        const { response, json } = await request(url, options);
        if(response.ok === true){
            setData(json)
            setLogin(true)
        }
    }, [request])

    React.useEffect(() => {
        const validateToken = async () => {
            const token = window.localStorage.getItem('token')
            if(token) {
                const { url, options } = TOKEN_VALIDATE_POST(token)
                const { response } = await request(url, options);
                if(response.ok === true){
                    await getUser(token)
                }
            }
        }
        validateToken()
    }, [getUser, request])
    

    return (
        <UserContext.Provider value={{ userLogin, getUser, userLogout, data, error, loading, login }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
