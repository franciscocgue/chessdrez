import React from 'react';
import Game from './components/Game';
import Navbar from './components/Navbar';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {

    return (
        <Routes>
            <Route path='/home' element={
                <div>
                    <Navbar />
                    <p style={{ marginLeft: '2rem' }}>Oops this is not yet finished 😳 (but you can check the Chess section!)</p>
                </div>
            } />
            <Route path='/chess' element={
                <div className={styles.container}>
                    <Navbar />
                    <Game />
                </div>}
            />
            <Route path='*' element={
                <div>
                    <Navbar />
                    <p style={{ marginLeft: '2rem' }}>Oops this is not yet finished 😳 (but you can check the Chess section!)</p>
                </div>
            } />
        </Routes >


    )
};

export default App;