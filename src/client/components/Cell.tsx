import React, { useContext } from 'react'
import GameContext from '../store/game-context';
import { getCoords } from '../utils/logic';

import styles from './Cell.module.css';

interface Props {
    key: string,
    col: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    row: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    img: string,
}

const Cell = ({ col, row, img }: Props) => {

    const gameCtx = useContext(GameContext);

    const cellColor = (row % 2 && col % 2) || (!(row % 2) && !(col % 2)) ? 'black' : 'white';

    return (
        <div
            className={`${styles[cellColor]} ${styles.cell} ${gameCtx.shadowEnabled && gameCtx.shadows.includes(getCoords(row, col)) ? styles.shadow : ''}`}

            onDragEnter={e => {
                e.stopPropagation()
                gameCtx.onDragEnter(row, col);
            }}
            onDrop={e => {
                e.preventDefault()
                e.stopPropagation()
                console.log('on drop Cell.tsx!')
                gameCtx.onUpdateBoard(gameCtx.dragging, gameCtx.draggingOver)
                // console.log('cell: dropped')
            }}
            onMouseEnter={e => gameCtx.onCellEntered(row, col)}
        >
            <div onDragStart={e => {
                gameCtx.onDragStart(row, col);
            }}
                draggable
                className={`${styles['draggable']} ${styles['icon']}`}
            // src={img} 
            // width={'95%'}
            >
                {img}
                {/* {row},{col}
            {piece} */}
            </div>
        </div>
    )
};

export default Cell;