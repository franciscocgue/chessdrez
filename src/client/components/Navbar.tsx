import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {

    return (
        <ul className={styles.container}>
            <li>Home</li>
            <li>New Game</li>
        </ul>
    )
}

export default Navbar;