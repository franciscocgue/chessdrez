import React, { useContext, useEffect, useState } from 'react';
import Board from '../components/Board';
import EatenOnes from '../components/EatenOnes';
import GameContext from '../store/game-context';

import styles from './Game.module.css'

const secondsToInterval = (seconds: number) => {
    const minutesStr = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsStr = Math.floor(seconds % 60).toString().padStart(2, '0');

    return minutesStr + ':' + secondsStr;

};

const Game = () => {

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
                <div className={styles.nowplaying}><div className={`${styles[gameCtx.playing]}`}><p className={styles.player}>{'Player ' + gameCtx.playing}</p></div><p key={gameCtx.playing} title="Current move's time" className={styles.timer}>{secondsToInterval(playTime)}</p></div>
                <input id='shadowToggle' name='shadowToggle' type={'checkbox'} onChange={() => gameCtx.onToggleShadow()} />
                <label title='Highlight possible moves' htmlFor='shadowToggle'>Show Help</label>
                <EatenOnes color={'black'} />
                <EatenOnes color={'white'} />
            </div>
            {/* <button onClick={async () => {
                const response = await fetch(
                    'http://localhost:8080/mock-response',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (!response.ok) {
                    console.log('error in response!')
                } else {
                    const data = await response.json();
                    console.log(data)
                }

            }}>Click me!</button> */}
        </div>
    )
};

export default Game;