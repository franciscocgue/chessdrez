import React from 'react'

import styles from './Cell.module.css';

interface Props {
    posV: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    posH: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey'
}

const Cell = ({ posV, posH, piece }: Props) => {

    const teamColor = (posH % 2 && posV % 2) || (!(posH % 2) && !(posV % 2)) ? 'negras' : 'blancas';

    return (
        <div className={styles[teamColor]}>

        </div>
    )
};

export default Cell;