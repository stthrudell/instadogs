import React from 'react'
import { Link } from 'react-router-dom'

import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Error from '../Helpers/Error'

import useForm from '../../Hooks/useForm'

import { UserContext } from '../../contexts/UserContext'

import styles from './LoginForm.module.css'
import stylesBtn from '../../Components/Forms/Button.module.css'


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
        <section className="animeLeft">
            <h1 className="title">Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username} />
                <Input label="Senha" type="password" name="password" {...password}/>
                <Button disabled={loading}>{loading ? 'Carregando...' : 'Entrar'}</Button>                
                <Error error={error} />
            </form>
            <Link className={styles.perdeu} to="/login/perdeu">Perdeu a Senha?</Link>
            <div className={styles.cadastro}>
                <h2 className={styles.subtitle}>Cadastre-se</h2>
                <p>Ainda não possui conta? Cadastre-se no site.</p>
                <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>
            </div>
        </section>
    )
}

export default LoginForm
