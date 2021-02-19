import React from 'react'
import { Link } from 'react-router-dom'

import Input from '../Forms/Input'
import Button from '../Forms/Button'

import useForm from '../../Hooks/useForm'

import { UserContext } from '../../contexts/UserContext'

const LoginForm = () => {

    const { userLogin, error, loading } = React.useContext(UserContext)

    const username = useForm()
    const password = useForm()

    async function handleSubmit(event) {
        event.preventDefault()
        if(username.validate() && password.validate) {
            await userLogin({
                username: username.value,
                password: password.value,
            })
        }
    } 
    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Senha" type="password" name="password" {...password}/>
                <Button disabled={loading}>{loading ? 'Carregando...' : 'Entrar'}</Button>
                {error && <p>{error}</p>}
            </form>
            <Link to="/login/criar">Cadastro</Link>
        </section>
    )
}

export default LoginForm
