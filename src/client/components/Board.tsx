import React from 'react';
import Cell from './Cell';

import styles from './Board.module.css';

const rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

const Board = () => {
    return (
        <div className={styles.board}>
            {rows.map(
                row => cols.map(
                    col =>
                        <Cell piece={null} posH={col} posV={row} />
                )
            )}
        </div>
    )
};

export default Board;