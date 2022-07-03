import React, { useState } from 'react';
import Cell from './Cell';
import { possibleMoves } from '../utils/logic';
import { BoardType, Piece } from '../utils/types';

import peonwhite from '../assets/peon_blanco.png';
import peonblack from '../assets/peon_negro.png';
import torrewhite from '../assets/torre_blanco.png';
import torreblack from '../assets/torre_negro.png';
import caballowhite from '../assets/caballo_blanco.png';
import caballoblack from '../assets/caballo_negro.png';
import alfilwhite from '../assets/alfil_blanco.png';
import alfilblack from '../assets/alfil_negro.png';
import reinawhite from '../assets/reina_blanco.png';
import reinablack from '../assets/reina_negro.png';
import reywhite from '../assets/rey_blanco.png';
import reyblack from '../assets/rey_negro.png';

import styles from './Board.module.css';

interface PieceImages {
    [key: string]: string,
}[]
const pieceImages: PieceImages = {
    'peonwhite': peonwhite,
    'peonblack': peonblack,
    'torrewhite': torrewhite,
    'torreblack': torreblack,
    'caballowhite': caballowhite,
    'caballoblack': caballoblack,
    'alfilwhite': alfilwhite,
    'alfilblack': alfilblack,
    'reinawhite': reinawhite,
    'reinablack': reinablack,
    'reywhite': reywhite,
    'reyblack': reyblack,
}

const getCoords = (row: number, col: number) => {
    const coords = row.toString() + col.toString();
    return coords;
}

const rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

interface NowDragging {
    row?: null | number,
    col?: null | number,
    piece?: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    color?: null | 'black' | 'white'
}

const boardInitial: BoardType = {
    '11': { piece: 'torre', color: 'black' }, '12': { piece: 'caballo', color: 'black' }, '13': { piece: 'alfil', color: 'black' }, '14': { piece: 'reina', color: 'black' }, '15': { piece: 'rey', color: 'black' }, '16': { piece: 'alfil', color: 'black' }, '17': { piece: 'caballo', color: 'black' }, '18': { piece: 'torre', color: 'black' },
    '21': { piece: 'peon', color: 'black' }, '22': { piece: 'peon', color: 'black' }, '23': { piece: 'peon', color: 'black' }, '24': { piece: 'peon', color: 'black' }, '25': { piece: 'peon', color: 'black' }, '26': { piece: 'peon', color: 'black' }, '27': { piece: 'peon', color: 'black' }, '28': { piece: 'peon', color: 'black' },
    '31': { piece: null, color: null }, '32': { piece: null, color: null }, '33': { piece: null, color: null }, '34': { piece: null, color: null }, '35': { piece: null, color: null }, '36': { piece: null, color: null }, '37': { piece: null, color: null }, '38': { piece: null, color: null },
    '41': { piece: null, color: null }, '42': { piece: null, color: null }, '43': { piece: null, color: null }, '44': { piece: null, color: null }, '45': { piece: null, color: null }, '46': { piece: null, color: null }, '47': { piece: null, color: null }, '48': { piece: null, color: null },
    '51': { piece: null, color: null }, '52': { piece: null, color: null }, '53': { piece: null, color: null }, '54': { piece: null, color: null }, '55': { piece: null, color: null }, '56': { piece: null, color: null }, '57': { piece: null, color: null }, '58': { piece: null, color: null },
    '61': { piece: null, color: null }, '62': { piece: null, color: null }, '63': { piece: null, color: null }, '64': { piece: null, color: null }, '65': { piece: null, color: null }, '66': { piece: null, color: null }, '67': { piece: null, color: null }, '68': { piece: null, color: null },
    '71': { piece: 'peon', color: 'white' }, '72': { piece: 'peon', color: 'white' }, '73': { piece: 'peon', color: 'white' }, '74': { piece: 'peon', color: 'white' }, '75': { piece: 'peon', color: 'white' }, '76': { piece: 'peon', color: 'white' }, '77': { piece: 'peon', color: 'white' }, '78': { piece: 'peon', color: 'white' },
    '81': { piece: 'torre', color: 'white' }, '82': { piece: 'caballo', color: 'white' }, '83': { piece: 'alfil', color: 'white' }, '84': { piece: 'reina', color: 'white' }, '85': { piece: 'rey', color: 'white' }, '86': { piece: 'alfil', color: 'white' }, '87': { piece: 'caballo', color: 'white' }, '88': { piece: 'torre', color: 'white' },
};

const Board = () => {

    const [shadowCoords, setShadowCoords] = useState([])
    const [nowDragging, setNowDragging] = useState< NowDragging>({})
    const [board, setBoard] = useState(boardInitial)

    const onHoverHandler = (row: number, col: number, board: BoardType) => {
        const moves = possibleMoves(row, col, board);
        setShadowCoords(moves);
        const coordinates = getCoords(row, col);
        setNowDragging({
            row: row,
            col: col,
            piece: coordinates in board ? board[coordinates].piece : null,
            color: coordinates in board ? board[coordinates].color : null
        })
    }

    const onDropHandle = (
        row: number,
        col: number,
        piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
        color: 'black' | 'white'
    ) => {
        const oldCoords = getCoords(nowDragging.row, nowDragging.col);
        const newCoords = getCoords(row, col);
        if (shadowCoords.includes(newCoords)) {
            setBoard(prev => {
                const prevBoard = { ...prev };
                prevBoard[oldCoords] = { piece: null, color: null };
                prevBoard[newCoords] = { piece: nowDragging.piece, color: nowDragging.color };
                return prevBoard;
            })
        }
    }

    return (
        <div className={styles.board}>
            {rows.map(
                row => cols.map(
                    col => <Cell
                        key={row.toString() + col.toString()}
                        // piece={board[row.toString() + col.toString()][piece]}
                        board={board}
                        piece={board[row.toString() + col.toString() as keyof typeof Board]['piece']}
                        img={pieceImages[
                            board[row.toString() + col.toString() as keyof typeof Board]['piece'] + board[row.toString() + col.toString() as keyof typeof Board]['color']
                        ]}
                        onDrop={onDropHandle}
                        row={row}
                        col={col}
                        shadow={shadowCoords.includes(getCoords(row, col))}
                        onHover={onHoverHandler}
                        color={board[row.toString() + col.toString() as keyof typeof Board]['color']}
                    />
                )
            )}
        </div>
    )
};

export default Board;