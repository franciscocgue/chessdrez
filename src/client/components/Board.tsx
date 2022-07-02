import React, { useState } from 'react';
import Cell from './Cell';

import peonblancas from '../assets/peon_blanco.png';
import peonnegras from '../assets/peon_negro.png';
import torreblancas from '../assets/torre_blanco.png';
import torrenegras from '../assets/torre_negro.png';
import caballoblancas from '../assets/caballo_blanco.png';
import caballonegras from '../assets/caballo_negro.png';
import alfilblancas from '../assets/alfil_blanco.png';
import alfilnegras from '../assets/alfil_negro.png';
import reinablancas from '../assets/reina_blanco.png';
import reinanegras from '../assets/reina_negro.png';
import reyblancas from '../assets/rey_blanco.png';
import reynegras from '../assets/rey_negro.png';

import styles from './Board.module.css';

interface PieceImages {
    [key: string]: string,
}[]
const pieceImages: PieceImages = {
    'peonblancas': peonblancas,
    'peonnegras': peonnegras,
    'torreblancas': torreblancas,
    'torrenegras': torrenegras,
    'caballoblancas': caballoblancas,
    'caballonegras': caballonegras,
    'alfilblancas': alfilblancas,
    'alfilnegras': alfilnegras,
    'reinablancas': reinablancas,
    'reinanegras': reinanegras,
    'reyblancas': reyblancas,
    'reynegras': reynegras,
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
    teamColor?: null | 'negras' | 'blancas'
}

interface CellType {
    piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
    color: null | 'negras' | 'blancas'
}

interface BoardType {
    [key: string]: CellType,
}[]
// interface BoardType {
//     '11': CellType, '12': CellType, '13': CellType, '14': CellType, '15': CellType, '16': CellType, '17': CellType, '18': CellType,
//     '21': CellType, '22': CellType, '23': CellType, '24': CellType, '25': CellType, '26': CellType, '27': CellType, '28': CellType,
//     '31': CellType, '32': CellType, '33': CellType, '34': CellType, '35': CellType, '36': CellType, '37': CellType, '38': CellType,
//     '41': CellType, '42': CellType, '43': CellType, '44': CellType, '45': CellType, '46': CellType, '47': CellType, '48': CellType,
//     '51': CellType, '52': CellType, '53': CellType, '54': CellType, '55': CellType, '56': CellType, '57': CellType, '58': CellType,
//     '61': CellType, '62': CellType, '63': CellType, '64': CellType, '65': CellType, '66': CellType, '67': CellType, '68': CellType,
//     '71': CellType, '72': CellType, '73': CellType, '74': CellType, '75': CellType, '76': CellType, '77': CellType, '78': CellType,
//     '81': CellType, '82': CellType, '83': CellType, '84': CellType, '85': CellType, '86': CellType, '87': CellType, '88': CellType,
// }

let boardInitial: BoardType = {
    '11': { piece: 'torre', color: 'negras' }, '12': { piece: 'caballo', color: 'negras' }, '13': { piece: 'alfil', color: 'negras' }, '14': { piece: 'reina', color: 'negras' }, '15': { piece: 'rey', color: 'negras' }, '16': { piece: 'alfil', color: 'negras' }, '17': { piece: 'caballo', color: 'negras' }, '18': { piece: 'torre', color: 'negras' },
    '21': { piece: 'peon', color: 'negras' }, '22': { piece: 'peon', color: 'negras' }, '23': { piece: 'peon', color: 'negras' }, '24': { piece: 'peon', color: 'negras' }, '25': { piece: 'peon', color: 'negras' }, '26': { piece: 'peon', color: 'negras' }, '27': { piece: 'peon', color: 'negras' }, '28': { piece: 'peon', color: 'negras' },
    '31': { piece: null, color: null }, '32': { piece: null, color: null }, '33': { piece: null, color: null }, '34': { piece: null, color: null }, '35': { piece: null, color: null }, '36': { piece: null, color: null }, '37': { piece: null, color: null }, '38': { piece: null, color: null },
    '41': { piece: null, color: null }, '42': { piece: null, color: null }, '43': { piece: null, color: null }, '44': { piece: null, color: null }, '45': { piece: null, color: null }, '46': { piece: null, color: null }, '47': { piece: null, color: null }, '48': { piece: null, color: null },
    '51': { piece: null, color: null }, '52': { piece: null, color: null }, '53': { piece: null, color: null }, '54': { piece: null, color: null }, '55': { piece: null, color: null }, '56': { piece: null, color: null }, '57': { piece: null, color: null }, '58': { piece: null, color: null },
    '61': { piece: null, color: null }, '62': { piece: null, color: null }, '63': { piece: null, color: null }, '64': { piece: null, color: null }, '65': { piece: null, color: null }, '66': { piece: null, color: null }, '67': { piece: null, color: null }, '68': { piece: null, color: null },
    '71': { piece: 'peon', color: 'blancas' }, '72': { piece: 'peon', color: 'blancas' }, '73': { piece: 'peon', color: 'blancas' }, '74': { piece: 'peon', color: 'blancas' }, '75': { piece: 'peon', color: 'blancas' }, '76': { piece: 'peon', color: 'blancas' }, '77': { piece: 'peon', color: 'blancas' }, '78': { piece: 'peon', color: 'blancas' },
    '81': { piece: 'torre', color: 'blancas' }, '82': { piece: 'caballo', color: 'blancas' }, '83': { piece: 'alfil', color: 'blancas' }, '84': { piece: 'reina', color: 'blancas' }, '85': { piece: 'rey', color: 'blancas' }, '86': { piece: 'alfil', color: 'blancas' }, '87': { piece: 'caballo', color: 'blancas' }, '88': { piece: 'torre', color: 'blancas' },
}

const getSurroundings = (
    row: number,
    col: number,
    board: BoardType
) => {
    // returns surrounding coordinates, 
    // clockwise starting at top
    return {
        top: row == 1 ? null : board[getCoords(row - 1, col)],
        topRight: row == 1 || col == 8 ? null : board[getCoords(row - 1, col + 1)],
        right: col == 8 ? null : board[getCoords(row, col + 1)],
        bottomRight: row == 8 || col == 8 ? null : board[getCoords(row + 1, col + 1)],
        bottom: row == 8 ? null : board[getCoords(row + 1, col)],
        bottomLeft: row == 8 || col == 1 ? null : board[getCoords(row + 1, col - 1)],
        left: col == 1 ? null : board[getCoords(row, col - 1)],
        topLeft: row == 1 || col == 1 ? null : board[getCoords(row - 1, col - 1)]
    };
}

const Board = () => {

    const [shadowCoords, setShadowCoords] = useState([])
    const [nowDragging, setNowDragging] = useState<NowDragging>({})
    const [board, setBoard] = useState(boardInitial)

    const onHoverHandler = (row: number, col: number, piece: null | 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey', teamColor: 'negras' | 'blancas') => {
        const surroundings = getSurroundings(row, col, board);
        console.log(surroundings)
        if (piece === 'peon') {
            if (teamColor === 'blancas') {
                if (row === 7) {
                    setShadowCoords([getCoords(row - 1, col), getCoords(row - 2, col)])
                } else {
                    setShadowCoords([getCoords(row - 1, col)])
                }
            } else {
                if (row === 2) {
                    setShadowCoords([getCoords(row + 1, col), getCoords(row + 2, col)])
                } else {
                    setShadowCoords([getCoords(row + 1, col)])
                }
            }
        } else if (piece === 'torre') {
            setShadowCoords(rows.filter(
                item => item !== row).map(item => getCoords(item, col)).concat(cols.filter(item => item !== col).map(item => getCoords(row, item))))
        } else if (piece === 'caballo') {
            setShadowCoords([
                getCoords(row - 2, col - 1),
                getCoords(row - 2, col + 1),
                getCoords(row - 1, col - 2),
                getCoords(row - 1, col + 2),
                getCoords(row + 2, col - 1),
                getCoords(row + 2, col + 1),
                getCoords(row + 1, col - 2),
                getCoords(row + 1, col + 2)
            ])
        } else if (piece === 'alfil') {
            setShadowCoords(rows.map(item => getCoords(item + row, item + col)).concat(cols.map(item => getCoords(item + row, -item + col))).concat(cols.map(item => getCoords(-item + row, -item + col))).concat(cols.map(item => getCoords(-item + row, item + col))))
        } else if (piece === 'reina') {
            let positions: string[] = [];
            // torre
            positions = positions.concat(rows.filter(item => item !== row).map(item => getCoords(item, col)).concat(cols.filter(item => item !== col).map(item => getCoords(row, item))))
            // alfil
            positions = positions.concat(rows.map(item => getCoords(item + row, item + col)).concat(cols.map(item => getCoords(item + row, -item + col))).concat(cols.map(item => getCoords(-item + row, -item + col))).concat(cols.map(item => getCoords(-item + row, item + col))))
            setShadowCoords(positions)
        } else if (piece === 'rey') {
            setShadowCoords([
                getCoords(row + 1, col + 1),
                getCoords(row + 1, col),
                getCoords(row + 1, col - 1),
                getCoords(row, col - 1),
                getCoords(row - 1, col - 1),
                getCoords(row - 1, col),
                getCoords(row - 1, col + 1),
                getCoords(row, col + 1),
            ])
        } else {
            setShadowCoords([])
        }
    }

    const onDropHandle = (
        row: number,
        col: number,
        piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
        teamColor: 'negras' | 'blancas'
    ) => {
        const oldCoords = getCoords(nowDragging.row, nowDragging.col);
        const newCoords = getCoords(row, col);
        if (shadowCoords.includes(newCoords)) {
            setBoard(prev => {
                const prevBoard = { ...prev };
                prevBoard[oldCoords] = { piece: null, color: null };
                prevBoard[newCoords] = { piece: nowDragging.piece, color: nowDragging.teamColor };
                return prevBoard;
            })
            console.log(row, col)
        }
    }

    const onDragStartHandle = (
        row: number,
        col: number,
        piece: 'peon' | 'alfil' | 'caballo' | 'torre' | 'reina' | 'rey',
        teamColor: 'negras' | 'blancas'
    ) => {
        const coords = getCoords(row, col);
        setNowDragging({
            row: row,
            col: col,
            piece: piece,
            teamColor: teamColor
        })
    }


    return (
        <div className={styles.board}>
            {rows.map(
                row => cols.map(
                    col => <Cell
                        key={row.toString() + col.toString()}
                        // piece={board[row.toString() + col.toString()][piece]}
                        piece={board[row.toString() + col.toString() as keyof typeof Board]['piece']}
                        img={pieceImages[
                            board[row.toString() + col.toString() as keyof typeof Board]['piece'] + board[row.toString() + col.toString() as keyof typeof Board]['color']
                        ]}
                        onDragStart={onDragStartHandle}
                        onDrop={onDropHandle}
                        row={row}
                        col={col}
                        shadow={shadowCoords.includes(getCoords(row, col))}
                        onHover={onHoverHandler}
                        teamColor={board[row.toString() + col.toString() as keyof typeof Board]['color']}
                    />
                )
            )}
        </div>
    )
};

export default Board;