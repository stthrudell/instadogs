import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
            <NavLink className={styles.logo} to="/" aria-label="Dogs - Home">
                <Dogs />
            </NavLink>
            <NavLink className={styles.login} to="/login">
                Login / Criar
            </NavLink>
        </nav>
      </header>
    )
}

export default Header
