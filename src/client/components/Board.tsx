import React, { useContext, useState } from 'react';
import Cell from './Cell';
import GameContext from '../store/game-context';

import ClockLoader from "react-spinners/ClockLoader";

// import peonwhite from '../assets/peon_blanco.png';
// import peonblack from '../assets/peon_negro.png';
// import torrewhite from '../assets/torre_blanco.png';
// import torreblack from '../assets/torre_negro.png';
// import caballowhite from '../assets/caballo_blanco.png';
// import caballoblack from '../assets/caballo_negro.png';
// import alfilwhite from '../assets/alfil_blanco.png';
// import alfilblack from '../assets/alfil_negro.png';
// import reinawhite from '../assets/reina_blanco.png';
// import reinablack from '../assets/reina_negro.png';
// import reywhite from '../assets/rey_blanco.png';
// import reyblack from '../assets/rey_negro.png';

import styles from './Board.module.css';

interface PieceImages {
    [key: string]: string,
}[]
const pieceImages: PieceImages = {
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
}

const rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

const Board = () => {

    const gameCtx = useContext(GameContext);

    return (
        <div className={styles.board}
            onMouseLeave={e => {
                // console.log('leaving')
                if (gameCtx.dragging === null) {
                    // e.preventDefault()
                    gameCtx.onDropOutsideBoard();
                }
            }}
        >
            {gameCtx.aiThinking && <div className={styles.aithinking}><ClockLoader color="#dd0000"  cssOverride={{backgroundColor:'white'}} /></div>}
            {rows.map(
                row => cols.map(
                    col => <Cell
                        key={row.toString() + col.toString()}
                        // board={gameCtx.board}
                        // piece={gameCtx.board[row.toString() + col.toString() as keyof typeof Board]['piece']}
                        // img={pieceImages[
                        //     gameCtx.board[row.toString() + col.toString() as keyof typeof Board]['piece'] + gameCtx.board[row.toString() + col.toString() as keyof typeof Board]['color']
                        // ]}
                        piece={gameCtx.board[row.toString() + col.toString() as keyof typeof Board]['piece']}
                        row={row}
                        col={col}
                        color={gameCtx.board[row.toString() + col.toString() as keyof typeof Board]['color']}
                    // color={gameCtx.board[row.toString() + col.toString() as keyof typeof Board]['color']}
                    />
                )
            )}
        </div>
    )
};

export default Board;