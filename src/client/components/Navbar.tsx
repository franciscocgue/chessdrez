import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <ul className={styles.container}>
            <NavLink
                to={'/home'}
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
        </ul>
    )
}

export default Navbar;

