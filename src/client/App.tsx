import React, { useContext, useEffect, useState } from 'react';
import Board from './components/Board';
import EatenOnes from './components/EatenOnes';
import GameContext from './store/game-context';

import styles from './App.module.css'

const secondsToInterval = (seconds: number) => {
    let interval = '';
    const minutesStr = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsStr = Math.floor(seconds % 60).toString().padStart(2, '0');

    return minutesStr + ':' + secondsStr;

};

const App = () => {

    const [playTime, setPlayTime] = useState(0);
    const gameCtx = useContext(GameContext);


    useEffect(() => {
        setPlayTime(0);
        const interval = setInterval(() => {
            setPlayTime(prev => {
                return prev + 1;
            });
        }, 1000)

        return () => {
            clearInterval(interval)
        }

    }, [gameCtx.playing])

    return (
        <div className={styles.container}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
                // dropped out of board
                e.preventDefault()
                gameCtx.onDropOutsideBoard();
            }}
            onDragEnter={e => {
                e.preventDefault();
                gameCtx.onDragExitBoard();
            }}
        >
            <div className={styles.board}>
                <Board />
            </div>
            <div className={styles.config}>
                <div className={styles.nowplaying}><p>Player</p><div className={`${styles[gameCtx.playing]}`}></div><p>({secondsToInterval(playTime)})</p></div>
                <EatenOnes color={'black'} />
                <EatenOnes color={'white'} />
            </div>
        </div>
    )
};

export default App;