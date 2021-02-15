import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    return (
        <nav className="container">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}

export default Header
