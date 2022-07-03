import React from 'react'
import { BoardType } from '../utils/types';

import styles from './Cell.module.css';

interface Props {
    key: string,
    board: BoardType,
    col: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    row: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    img: string,
    shadow: true | false,
    onHover: (row: number, col: number, board: BoardType) => void
    onDrop: (row: number, col: number, piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', color: 'black' | 'white') => void,
    color: 'white' | 'black'
}

const Cell = ({ board, col, row, piece, img, shadow, onHover, onDrop, color }: Props) => {

    const cellColor = (row % 2 && col % 2) || (!(row % 2) && !(col % 2)) ? 'black' : 'white';

    const onDragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const onDropHandle = (e: React.DragEvent<HTMLDivElement>, row: number, col: number, piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', color: 'black' | 'white') => {
        e.preventDefault();
        onDrop(row, col, piece, color);
    }

    return (
        <div
            className={`${styles[cellColor]} ${styles.cell} ${shadow ? styles.shadow : ''}`}
            onDragOver={(e) => {
                console.log('onDragOver', row, col)
                onDragOverHandle(e)
            }}
            // onDragEnd={(e) => test(e)}
            onDrop={(e) => {
                onDropHandle(e, row, col, piece, color)
                console.log('onDrop', row, col)
            }}
            onMouseEnter={e => {
                onHover(row, col, board)
                console.log('onMouseEnter', row, col)
            }}
            // onMouseLeave={e => onHover(row, col, board)}
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