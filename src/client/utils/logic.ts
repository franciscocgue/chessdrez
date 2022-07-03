import { Piece, Cell, BoardType } from './types';

// row and col to coordinates
const getCoords = (row: number, col: number) => {
    const coords = row.toString() + col.toString();
    return coords;
};

// possible moves of piece in row and col
const possibleMoves = (row: number, col: number, board: BoardType) => {

    const cellCoordinates = getCoords(row, col);
    const piece = board[cellCoordinates].piece;
    const color = board[cellCoordinates].color;

    let r, c, coordinates;

    let moves: string[] = [];
    if (piece === 'torre') {
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


    return moves;
}


export {
    possibleMoves,
};