import React from 'react';
import { createRoot } from 'react-dom/client';
import { GameContextProvider } from './store/game-context'
import {
    createBrowserRouter,
    RouterProvider,
    Route
} from 'react-router-dom';

import App from './App';

import './styles.css';
import Root from './pages/Root';
import Home from './components/Home';
import Game from './components/Game';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <div>Opps error</div>,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/chess/:gameid',
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