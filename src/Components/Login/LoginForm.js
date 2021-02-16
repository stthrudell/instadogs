import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../api/api'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'

const LoginForm = () => {

    const username = useForm()
    const password = useForm()

    async function handleSubmit(event) {
        event.preventDefault()
        if(username.validate() && password.validate) {
            api.post('jwt-auth/v1/token', JSON.stringify({
                username,
                password
            }))
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error.response))
        }
    } 
    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Senha" type="password" name="password" {...password}/>
                <Button>Entrar</Button>
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    )
}

export default LoginForm
