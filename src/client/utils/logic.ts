import { BoardType } from './types';

// row and col to coordinates
const getCoords = (row: number, col: number) => {
    const coords = row.toString() + col.toString();
    return coords;
};

// coordinates to row and col
const getRowCol = (coordinates: string) => {
    if (coordinates.length === 2) {
        return {
            row: parseInt(coordinates.slice(0, 1)),
            col: parseInt(coordinates.slice(1, 2))
        }
    } else {
        return {
            row: null,
            col: null
        }
    }
}

// possible moves of piece in row and col
const possibleMoves = (row: number, col: number, board: BoardType) => {

    const cellCoordinates = getCoords(row, col);
    const piece = board[cellCoordinates].piece;
    const color = board[cellCoordinates].color;

    let r, c, coordinates;

    let moves: string[] = [];
    if (piece === 'torre' || piece === 'reina') {
        // right
        for (c = col + 1; c <= 8; c++) {
            coordinates = getCoords(row, c);
            if (board[coordinates].color === null) {
                moves.push(coordinates);
            } else if (board[coordinates].color !== color) {
                moves.push(coordinates);
                break;
            } else {
                break;
            }
        }
        // left
        for (c = col - 1; c >= 1; c--) {
            coordinates = getCoords(row, c);
            if (board[coordinates].color === null) {
                moves.push(coordinates);
            } else if (board[coordinates].color !== color) {
                moves.push(coordinates);
                break;
            } else {
                break;
            }
        }
        // up
        for (r = row - 1; r >= 1; r--) {
            coordinates = getCoords(r, col);
            if (board[coordinates].color === null) {
                moves.push(coordinates);
            } else if (board[coordinates].color !== color) {
                moves.push(coordinates);
                break;
            } else {
                break;
            }
        }
        // down
        for (r = row + 1; r <= 8; r++) {
            coordinates = getCoords(r, col);
            if (board[coordinates].color === null) {
                moves.push(coordinates);
            } else if (board[coordinates].color !== color) {
                moves.push(coordinates);
                break;
            } else {
                break;
            }
        }
    }
    if (piece === 'peon') {
        const conditions = [
            { r: color === 'white' ? row - 1 : row + 1, c: col + 1, color: color === 'white' ? 'black' : 'white' },
            { r: color === 'white' ? row - 1 : row + 1, c: col - 1, color: color === 'white' ? 'black' : 'white' },
            { r: color === 'white' ? row - 1 : row + 1, c: col },
        ]
        for (let condition of conditions) {
            if ('color' in condition) {
                // top left/right
                coordinates = getCoords(condition.r, condition.c);
                if (coordinates in board && board[coordinates].color === condition.color) {
                    moves.push(coordinates);
                }
            } else {
                // top (+1 or +2)
                coordinates = getCoords(condition.r, condition.c);
                if (coordinates in board && board[coordinates].color === null) {
                    moves.push(coordinates);
                    if ((color === 'white' && row === 7)
                        || (color === 'black' && row === 2)) {
                        r = color === 'white' ? row - 2 : row + 2;
                        coordinates = getCoords(r, condition.c);
                        if (coordinates in board && board[coordinates].color === null) {
                            moves.push(coordinates);
                        }
                    }
                }
            }
        }

    }
    if (piece === 'alfil' || piece === 'reina') {
        // top-right
        for (let ii = 1; ii <= 8; ii++) {
            r = row + ii;
            c = col + ii;
            coordinates = getCoords(r, c);
            if (coordinates in board) {
                if (board[coordinates].color === null) {
                    moves.push(coordinates);
                } else if (board[coordinates].color !== color) {
                    moves.push(coordinates);
                    break;
                } else {
                    break;
                }
            }
        }
        // top-left
        for (let ii = 1; ii <= 8; ii++) {
            r = row + ii;
            c = col - ii;
            coordinates = getCoords(r, c);
            if (coordinates in board) {
                if (board[coordinates].color === null) {
                    moves.push(coordinates);
                } else if (board[coordinates].color !== color) {
                    moves.push(coordinates);
                    break;
                } else {
                    break;
                }
            }
        }
        // bottom-left
        for (let ii = 1; ii <= 8; ii++) {
            r = row - ii;
            c = col - ii;
            coordinates = getCoords(r, c);
            if (coordinates in board) {
                if (board[coordinates].color === null) {
                    moves.push(coordinates);
                } else if (board[coordinates].color !== color) {
                    moves.push(coordinates);
                    break;
                } else {
                    break;
                }
            }
        }
        // bottom-right
        for (let ii = 1; ii <= 8; ii++) {
            r = row - ii;
            c = col + ii;
            coordinates = getCoords(r, c);
            if (coordinates in board) {
                if (board[coordinates].color === null) {
                    moves.push(coordinates);
                } else if (board[coordinates].color !== color) {
                    moves.push(coordinates);
                    break;
                } else {
                    break;
                }
            }
        }
    }
    if (piece === 'caballo') {
        const coordinatesPossible = [
            getCoords(row - 2, col - 1),
            getCoords(row - 2, col + 1),
            getCoords(row - 1, col - 2),
            getCoords(row - 1, col + 2),
            getCoords(row + 2, col - 1),
            getCoords(row + 2, col + 1),
            getCoords(row + 1, col - 2),
            getCoords(row + 1, col + 2)
        ];
        for (coordinates of coordinatesPossible) {
            if (coordinates in board && board[coordinates].color !== color) {
                moves.push(coordinates);
            };
        };
    }
    if (piece === 'rey') {
        const coordinatesPossible = [
            getCoords(row + 1, col + 1),
            getCoords(row + 1, col),
            getCoords(row + 1, col - 1),
            getCoords(row, col - 1),
            getCoords(row - 1, col - 1),
            getCoords(row - 1, col),
            getCoords(row - 1, col + 1),
            getCoords(row, col + 1),
        ];
        for (coordinates of coordinatesPossible) {
            if (coordinates in board && board[coordinates].color !== color) {
                moves.push(coordinates);
            };
        };
    }
    return moves;
}

const isCheck = (board: BoardType, color: 'white' | 'black') => {
    // check if there is check to <color> king

    const boardCopy = { ...board };
    const opposite = color === 'white' ? 'black' : 'white'
    let kingPos = '';
    try {
        kingPos = Object.keys(boardCopy).filter(idx => boardCopy[idx].color === color && boardCopy[idx].piece === 'rey')[0];
    } catch (err) {
        console.error(`No king for ${color} player`)
        return
    }
    // Loop opposite color to see if king checked
    for (let idx in boardCopy) {
        if (boardCopy[idx].color === opposite) {
            const { row, col } = getRowCol(idx);
            if (possibleMoves(row, col, boardCopy).includes(kingPos)) {
                return {
                    isChecked: true,
                    checkedKingPos: kingPos,
                    checkerPos: idx,
                }
            }
        }
    }
    return {
        isChecked: false,
        checkedKingPos: null,
        checkerPos: null,
    }
}


export {
    possibleMoves,
    getCoords,
    getRowCol,
    isCheck,
};