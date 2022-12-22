import React, { useContext, useEffect } from 'react'
import GameContext from '../store/game-context';
import { getCoords } from '../utils/logic';

import styles from './Cell.module.css';

interface Props {
    key: string,
    col: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    row: number, // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    img: string,
    color: 'white' | 'black'
}

const Cell = ({ col, row, img, color }: Props) => {

    const gameCtx = useContext(GameContext);

    const cellColor = (row % 2 && col % 2) || (!(row % 2) && !(col % 2)) ? 'black' : 'white';

    // Cell extra classes:
    let extraClasses = ' ';
    if (gameCtx.shadowEnabled && gameCtx.shadows.includes(getCoords(row, col))) {
        // Shadow
        extraClasses += styles.shadow;
        extraClasses += ' ';
    } else if (gameCtx.check.isCheck && gameCtx.check.checkedKingPos === getCoords(row, col)) {
        // checked king
        extraClasses += styles['king-checked'];
        extraClasses += ' ';
    } else if (gameCtx.check.isCheck && gameCtx.check.checkerPos === getCoords(row, col)) {
        // checked king
        extraClasses += styles['checked-by'];
        extraClasses += ' ';
    } else if (
        gameCtx.showLastMove
        && gameCtx.history.length > 0
        && ((
            gameCtx.history[gameCtx.history.length - 1].pieceTo.col === col
            && gameCtx.history[gameCtx.history.length - 1].pieceTo.row === row)
            || (
                gameCtx.history[gameCtx.history.length - 1].pieceFrom.col === col
                && gameCtx.history[gameCtx.history.length - 1].pieceFrom.row === row
            ))
    ) {
        // Show last moves
        extraClasses += styles['last-move'];
    }

    return (
        <div
            className={`${styles[cellColor]} 
            ${styles.cell} 
            ${extraClasses}    
        `}

            onDragEnter={e => {
                e.stopPropagation()
                gameCtx.onDragEnter(row, col);
            }}
            onDrop={e => {
                e.preventDefault()
                e.stopPropagation()
                // console.log('on drop Cell.tsx!')
                gameCtx.onUpdateBoard(gameCtx.dragging, gameCtx.draggingOver)
                // console.log('cell: dropped')
            }}
            onClick={e => {
                // similar to onDrop but mobile device
                if (gameCtx.dragging) {
                    e.preventDefault()
                    e.stopPropagation()
                    // console.log('on click Cell.tsx!')
                    gameCtx.onDragEnter(row, col) // sets draggingOver (as target)
                    gameCtx.onUpdateBoard(gameCtx.dragging, getCoords(row, col))
                    // console.log('cell: dropped')
                }
            }}
            onMouseEnter={e => gameCtx.onCellEntered(row, col)}
        >
            <div className={styles['cell-content']}>
                {col === 1 && <span className={styles['cell-row']}>{row}</span>}
                {row === 8 && <div className={styles['cell-col']}>{String.fromCharCode(96 + col)}</div>}
                <div onDragStart={e => {
                    gameCtx.onDragStart(row, col);
                }}
                    onClick={e => {
                        // similar to onDragStart but mobile device
                        // console.log('inner div clicked')
                        gameCtx.onDragStart(row, col);
                    }}
                    draggable
                    className={`${styles['draggable']} ${color === 'white' ? styles['icon-white'] : styles['icon-black']}`}
                // src={img} 
                // width={'95%'}
                >

                    {img}

                    {/* {row},{col}
            {piece} */}
                </div>
            </div>
        </div>
    )
};

export default Cell;