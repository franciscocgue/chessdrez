import React from 'react';
import Game from './components/Game';
import Navbar from './components/Navbar';
import styles from './App.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';

const App = () => {

    return (
        <Routes>
            <Route path='/home' element={
                <div className={styles.container}>
                    <Navbar />
                    <Home />
                </div>
            } />
            <Route path='/chess' element={
                <div className={styles.container}>
                    <Navbar />
                    <Game />
                </div>}
            />
            <Route
                path="*"
                element={<Navigate to="/chess" replace />}
            />
        </Routes >


    )
};

export default App;