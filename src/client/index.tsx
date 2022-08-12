import React from 'react';
import { createRoot } from 'react-dom/client';
import { GameContextProvider } from './store/game-context'

import App from './App';

import './styles.css';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <GameContextProvider>
            <App />
        </GameContextProvider>
    </React.StrictMode>
);