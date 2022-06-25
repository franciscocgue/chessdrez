import React from 'react'

import styles from './Cell.module.css';

interface Props {
    key: string,
    col: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    row: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    img: string,
    shadow: true | false,
    onHover: (row: number, col: number, piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', teamColor: 'negras' | 'blancas') => void
    onDrop: (row: number, col: number, piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', teamColor: 'negras' | 'blancas') => void,
    onDragStart: (row: number, col: number, piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', teamColor: 'negras' | 'blancas') => void,
    teamColor: 'blancas' | 'negras'
}

const Cell = ({ col, row, piece, img, shadow, onHover, onDrop, onDragStart, teamColor }: Props) => {

    const cellColor = (row % 2 && col % 2) || (!(row % 2) && !(col % 2)) ? 'negras' : 'blancas';

    const onDragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const onDropHandle = (e: React.DragEvent<HTMLDivElement>, row: number, col: number, piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', teamColor: 'negras' | 'blancas') => {
        e.preventDefault();
        console.log('inner', piece, teamColor)
        onDrop(row, col, piece, teamColor);
    }

    const onDragStartHandle = (e: React.DragEvent<HTMLDivElement>, row: number, col: number, piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', teamColor: 'negras' | 'blancas') => {
        console.log('inner', piece, teamColor)
        onDragStart(row, col, piece, teamColor)
    }

    return (
        <div
            className={`${styles[cellColor]} ${styles.cell} ${shadow ? styles.shadow : ''}`}
            onDragStart={(e) => onDragStartHandle(e, row, col, piece, teamColor)}
            onDragOver={(e) => onDragOverHandle(e)}
            // onDragEnd={(e) => test(e)}
            onDrop={(e) => onDropHandle(e, row, col, piece, teamColor)}
            onMouseEnter={e => onHover(row, col, piece, teamColor)}
            onMouseLeave={e => onHover(row, col, null, null)}>
            <img className={styles['draggable']}
                src={img}
            >
                {/* {row},{col}
            {piece} */}
            </img>
        </div>
    )
};

export default Cell;