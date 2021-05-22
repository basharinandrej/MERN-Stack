import React, {useContext, useEffect} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import './NavBar.css'
import {AuthContext} from "../../context/authContext";

const localStorageName = 'userData'

const NavBar = () => {
    const {logout, email} = useContext(AuthContext)
    const history = useHistory()
    const [emailLocation, setEmailLocation] = React.useState(null)
    const logoutHandler = () => {
        logout()
        history.push('/')
    }

    useEffect(() => {
        const email = JSON.parse(localStorage.getItem(localStorageName))?.email
        setEmailLocation(email)
    }, [])

    return (
        <nav className="nav">
            <p className="nav__logo">Сокращение ссылок</p>&nbsp;
            <p className="nav__logo">Email: {email || emailLocation}</p>

            <ul className="nav__list list">
                <NavLink to="/create">Create </NavLink>
                <NavLink to="/links">Links </NavLink>
            </ul>

            <button className="nav__btn btn" onClick={logoutHandler}>
                Выйти
            </button>
        </nav>
    )
}

export default NavBar
