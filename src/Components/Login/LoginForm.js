import React from 'react'
import { Link } from 'react-router-dom'

import { getToken, getUser } from '../../api/api'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'

const LoginForm = () => {

    const username = useForm()
    const password = useForm()

    React.useEffect(() => {
        const token = window.localStorage.getItem('token')
        if(token)
            getUser(token)
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()
        if(username.validate() && password.validate) {
            const response = await getToken({
                username: username.value,
                password: password.value,
            })

            if(response.error) {
                console.log(response.message);
                return;
            }

            window.localStorage.setItem('token', response.token);

            console.log(response)

            const user = await getUser(response.token)
            console.log(user)
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
