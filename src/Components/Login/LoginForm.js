import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../api/api'

const LoginForm = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        api.post('jwt-auth/v1/token', JSON.stringify({
            username,
            password
        }))
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error.response))
    } 
    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
                <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
                <button>Entrar</button>
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    )
}

export default LoginForm
