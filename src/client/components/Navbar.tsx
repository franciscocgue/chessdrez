import React from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return (
        <ul className={styles.container}>
            <NavLink to={'/home'} style={{color: 'white', textDecoration: 'none'}}>
                <li>Home</li>
            </NavLink>
            <NavLink to={'/chess'} style={{color: 'white', textDecoration: 'none'}}>
                <li>Chess</li>
            </NavLink>
        </ul>
    )
}

export default Navbar;