import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import chess_logo from '../assets/chess_logo.png';

const Navbar = () => {

    return (
        <ul className={styles.container}>
            <NavLink
                to={'/'}
            >
                <img className={styles.logo} src={chess_logo} />
            </NavLink>
            <NavLink
                to={'/'}
                end
                className={({ isActive }) =>
                    (isActive ? styles.active : "")}
                style={{ color: 'white', textDecoration: 'none' }}
            >
                <div>Home</div>
            </NavLink>

            <NavLink
                to={'/chess'}
                className={({ isActive }) =>
                    (isActive ? styles.active : "")}
                style={{ color: 'white', textDecoration: 'none' }}
            >
                <div>Chess</div>
            </NavLink>

            <NavLink
                to={'/config'}
                end
                className={({ isActive }) =>
                    (isActive ? styles.active : "")}
                style={{ color: 'white', textDecoration: 'none' }}
            >
                <div>Settings</div>
            </NavLink>

            <NavLink
                to={'/about'}
                end
                className={({ isActive }) =>
                    (isActive ? styles.active : "")}
                style={{ color: 'white', textDecoration: 'none' }}
            >
                <div>About</div>
            </NavLink>
        </ul>
    )
}

export default Navbar;

