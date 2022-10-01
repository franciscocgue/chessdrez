import React, { useContext, useEffect, useState } from 'react';
import Board from '../components/Board';
import EatenOnes from '../components/EatenOnes';
import GameContext from '../store/game-context';
import { ImMoveDown } from 'react-icons/im';
import { GoDeviceMobile } from 'react-icons/go';
import { GrPersonalComputer } from 'react-icons/gr';


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
                console.log("dropped out of board")
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
                <div className={styles['move-help']}>
                    <p><span><GoDeviceMobile /></span>Tap once to select piece, tap again to move!</p>
                    <p><span><GrPersonalComputer /></span> Either tap, or click and drag!</p>
                </div>
                <label className={styles['label-help']} title='Highlight possible moves' ><ImMoveDown /> Show legal moves<input id='shadowToggle' name='shadowToggle' type={'checkbox'} onChange={() => gameCtx.onToggleShadow()} /> </label>
                <div className={styles['config-player']}>
                    <div className={styles.nowplaying}><div className={`${styles['white']}`}><p className={styles.player}>{'Player white'}</p></div><p key={'white'} title="Current move's time" className={`${gameCtx.playing === 'white' ? styles.timer : styles.hide}`}>{secondsToInterval(playTime)}</p></div>
                    <EatenOnes color={'white'} />
                </div>
                <div className={styles['config-player']}>
                    <div className={styles.nowplaying}><div className={`${styles['black']}`}><p className={styles.player}>{'Player black'}</p></div><p key={'black'} title="Current move's time" className={`${gameCtx.playing === 'black' ? styles.timer : styles.hide}`}>{secondsToInterval(playTime)}</p></div>
                    <EatenOnes color={'black'} />
                </div>
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