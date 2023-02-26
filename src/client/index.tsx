import React from 'react';
import { createRoot } from 'react-dom/client';
import { GameContextProvider } from './store/game-context'
import {
    createBrowserRouter,
    RouterProvider,
    Route
} from 'react-router-dom';

// import App from './App';

import './styles.css';
import styles from './App.module.css';
import Root from './pages/Root';
import Home from './components/Home';
import Game from './components/Game';
import About from './components/About';
import Settings from './components/Settings';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <div className={styles.error}>
            <p>Oops! An error just occurred 😅</p>
            <p><a href='/'>Back to Chessdrez</a></p>
        </div>,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/config',
                element: <Settings />,
            },
            // {
            //     path: '/chess/:gameid',
            //     // path: '/chess/:cheddid',
            //     element: <Game />,
            // },
            {
                path: '/chess',
                // path: '/chess/:cheddid',
                element: <Game />,
            },
        ],
    },
])

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <GameContextProvider>
            <RouterProvider router={router} />
            {/* <App /> */}
        </GameContextProvider>
    </React.StrictMode>
);