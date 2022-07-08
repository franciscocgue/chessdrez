import React, { useContext, useEffect, useState } from 'react'
import { BoardType } from '../utils/types';
import GameContext from '../store/game-context';
import { getCoords, possibleMoves } from '../utils/logic';

import styles from './Cell.module.css';

interface Props {
    key: string,
    board: BoardType,
    col: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    row: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    img: string,
    color: 'white' | 'black'
}

const Cell = ({ board, col, row, piece, img, color }: Props) => {

    const gameCtx = useContext(GameContext);

    const cellColor = (row % 2 && col % 2) || (!(row % 2) && !(col % 2)) ? 'black' : 'white';

    return (
        <div draggable
            className={`${styles[cellColor]} ${styles.cell} ${gameCtx.shadowEnabled && gameCtx.shadows.includes(getCoords(row, col)) ? styles.shadow : ''}`}
            onDragStart={e => {
                gameCtx.onDragStart(row, col);
            }}
            onDragEnter={e => {
                e.stopPropagation()
                gameCtx.onDragEnter(row, col);
            }}
            onDrop={e => {
                e.preventDefault()
                e.stopPropagation()
                gameCtx.onUpdateBoard(gameCtx.dragging, gameCtx.draggingOver)
                console.log('cell: dropped')
            }}
            onMouseEnter={e => gameCtx.onCellEntered(row, col)}
        >
            <img className={`${styles['draggable']} ${styles['icon']}`}
                src={img} width={'95%'}
            >
                {/* {row},{col}
            {piece} */}
            </img>
        </div>
    )
};

export default Cell;