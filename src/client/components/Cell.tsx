import React from 'react'

import styles from './Cell.module.css';

interface Props {
    key: string,
    col: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    row: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    img: string,
    shadow: true | false,
    onHover: (posH: number, posV: number, piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', teamColor: 'negras' | 'blancas') => void
    teamColor: 'blancas' | 'negras'
}

const Cell = ({ col, row, piece, img, shadow, onHover, teamColor }: Props) => {

    const cellColor = (row % 2 && col % 2) || (!(row % 2) && !(col % 2)) ? 'negras' : 'blancas';

    return (
        <div className={`${styles[cellColor]} ${styles.cell} ${shadow ? styles.shadow : ''}`}
            onMouseEnter={e => onHover(row, col, piece, teamColor)}
            onMouseLeave={e => onHover(row, col, null, null)}>
            <img
                src={img}
            >
                {/* {row},{col}
            {piece} */}
            </img>
        </div>
    )
};

export default Cell;