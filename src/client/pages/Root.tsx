import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './Root.module.css';

const Root = () => {
    return <div className={styles.container}>
        <Navbar />
        {<Outlet />}
    </div>
}

export default Root;