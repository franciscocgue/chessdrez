import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../components/Board';
import EatenOnes from '../components/EatenOnes';
import GameContext from '../store/game-context';
import { BiRightArrowAlt } from 'react-icons/bi'

import { io } from "socket.io-client";
const socket = io();

import styles from './Game.module.css'

const secondsToInterval = (seconds: number) => {
    const minutesStr = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsStr = Math.floor(seconds % 60).toString().padStart(2, '0');

    return minutesStr + ':' + secondsStr;

};

const icons = {
    'peonwhite': '♙',
    'peonblack': '♟',
    'torrewhite': '♖',
    'torreblack': '♜',
    'caballowhite': '♘',
    'caballoblack': '♞',
    'alfilwhite': '♗',
    'alfilblack': '♝',
    'reinawhite': '♕',
    'reinablack': '♛',
    'reywhite': '♔',
    'reyblack': '♚',
};

const colDic = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',
};

const Game = () => {

    const [playTime, setPlayTime] = useState(0);
    const [lastNRows, setLastNRows] = useState('3');
    const gameCtx = useContext(GameContext);

    const { gameid } = useParams();

    // console.log('gameid', gameid)

    const historyComp = gameCtx.history.slice(0).reverse().map((item, ii) => {
        const idx = item.pieceFrom.piece + item.pieceFrom.color as keyof typeof icons;
        const icon = icons[idx];
        const from = item.pieceFrom.row + colDic[item.pieceFrom.col as keyof typeof colDic]
        const to = item.pieceTo.row + colDic[item.pieceTo.col as keyof typeof colDic]
        const iconClass = item.pieceFrom.color === 'black' ? `${styles['history-icon']} ${styles['black-bgnd']}` :
            `${styles['history-icon']} ${styles['white-bgnd']}`
        let captured = '';
        if ('eaten' in item) {
            const idxCap = item.eaten.piece + item.eaten.color as keyof typeof icons;
            const iconCap = icons[idxCap];
            captured = `${iconCap}`
        }

            return <p key={ii.toString()} className={styles['history-row']}><span style={{ display: 'inline-block', width: '2rem' }}>{gameCtx.history.length - ii}.</span> <span className={iconClass}>{icon}</span> {from} <BiRightArrowAlt /> {to} <span style={{color:'red'}}>{captured}</span></p>

    });

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
            <div className={styles.info}>
                {gameCtx.history.length > 0 && <div className={styles['history']}>
                    <div className={styles['history-btns']}>
                        <button className={styles['history-btn']} onClick={e => setLastNRows('1')}>Last move</button>
                        <button className={styles['history-btn']} onClick={e => setLastNRows('3')}>Last 3</button>
                        <button className={styles['history-btn']} onClick={e => setLastNRows('10')}>Last 10</button>
                    </div>
                    <div className={`${styles['history-last-' + lastNRows]}`}>
                        {historyComp}
                        {/* {gameCtx.history.map(item => <span>{`${icons[item.pieceFrom.piece+item.pieceFrom.color]}): aa 🠦 bb`}</span>)} */}
                    </div>
                </div>}

                <div className={styles['info-player']}>
                    <div className={styles.nowplaying}><div className={`${styles['white']}`}><p className={styles.player}>{'Player white'}</p></div><p key={'white'} title="Current move's time" className={`${gameCtx.playing === 'white' ? styles.timer : styles.hide}`}>{secondsToInterval(playTime)}</p></div>
                    <EatenOnes color={'white'} />
                </div>
                <div className={styles['info-player']}>
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
        </div >
    )
};

export default Game;