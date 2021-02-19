import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import styles from './Header.module.css'

import { UserContext } from '../contexts/UserContext'
import Button from './Forms/Button';

const Header = () => {
    
    const { data, userLogout } = React.useContext(UserContext)

    console.log(data)

    return (
        <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
            <Link className={styles.logo} to="/" aria-label="Dogs - Home">
                <Dogs />
            </Link>
            {data ? (
                <Link className={styles.login} to="/conta">
                    {data.nome}
                    <Button onClick={() => userLogout()}>Sair</Button>
                </Link>
            ) : (
                <Link className={styles.login} to="/login">
                    Login / Criar
                </Link>
            )}
        </nav>
      </header>
    )
}

export default Header
