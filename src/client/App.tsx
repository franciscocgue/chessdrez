import React from 'react';
import Game from './components/Game';
import Navbar from './components/Navbar';
import styles from './App.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {

    return (
        <Routes>
            <Route path='/home' element={
                <div>
                    <Navbar />
                    <div style={{ marginLeft: '2rem', marginTop: '4rem' }}>
                        <p>Oops this is not yet finished 😳 (but you can check the Chess section!)</p>
                        <p>Wanna check the <b>Github repo</b>? <a target='_blank' href='https://github.com/franciscocgue/chessdrez'>Chessdrez</a></p>
                    </div>
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
                element={<Navigate to="/home" replace />}
            />
        </Routes >


    )
};

export default App;