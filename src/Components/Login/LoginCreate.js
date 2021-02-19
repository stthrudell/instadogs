import React from 'react'

import api from '../../api/api'

import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Error from '../Helpers/Error'

import useForm from '../../Hooks/useForm'

import { UserContext } from '../../contexts/UserContext';

const LoginCreate = () => {

    const { userLogin } = React.useContext(UserContext)

    const username = useForm();
    const email = useForm('email');
    const password = useForm();

    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    async function handleSubmit(event) {
        event.preventDefault();        
        try {
            setError(null)
            setLoading(true)
            api.defaults.headers.post['Content-Type'] = 'application/json'
            const response = await api.post('api/user', JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
            }))
            userLogin({username: username.value, password: password.value})
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="animeLeft">
            <h1 className="title">Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Email" type="email" name="email" {...email} />
                <Input label="Senha" type="password" name="password" {...password} />
                <Button disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Button>
                <Error error={error}/>
            </form>
        </section>
    )
}

export default LoginCreate
