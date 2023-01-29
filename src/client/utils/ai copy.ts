import { BoardType } from "./types";
import { getRowCol, possibleMoves } from "./logic";

// Start ai-player

// 0. Parameters
const maxDepth = 1;

// 1. moves left?
const isMovesLeft = (board: BoardType) => {
    // check 2 kings on board
    let kings = 0;
    for (let idx in board) {
        if (board[idx].piece === 'rey') {
            kings += 1;
        }
    }

    // @TODO: need to add tie if moves
    // without capturing pieces are over 50(?)

    return kings === 2;
}

// 2. Score the current board
const evaluate = (board: BoardType, playing: 'white' | 'black') => {
    // Ideally pieces should have different values in
    // different parts of the board; for simplicity, not so.
    const values = {
        peon: 10,
        alfil: 20,
        caballo: 30,
        torre: 30,
        reina: 100,
        rey: 10000
    };
    let score = 0;
    for (let idx in board) {
        if (board[idx].piece !== null) {
            if (board[idx].color == playing) {
                score += values[board[idx].piece]
            } else {
                score -= values[board[idx].piece]
            }
        }
    }
    return score;
}

// 3. Minimax algorithm
// Consider all possible moves game can do, and 
// return best move according to maximizer
const minimax = (board: BoardType, depth: number, isMax: true | false, playing: 'white' | 'black') => {
    // terminal node (leaf) or max depth

    const boardCopy = JSON.parse(JSON.stringify(board)) as BoardType;

    // If there are no more moves
    // if (isMovesLeft(boardCopy) === false) {
    //     return 10000000;
    // }


    if (depth >= maxDepth) {
        return evaluate(boardCopy, playing);
    }

    if (isMax) {
        let bestVal = Number.NEGATIVE_INFINITY;
        for (let idx in boardCopy) {
            if (boardCopy[idx].piece !== null) {
                // Position has piece
                // Get possible moves
                const { row, col } = { ...getRowCol(idx) }
                const moves = possibleMoves(row, col, boardCopy)
                moves.forEach(move => {
                    // Store old value
                    const { piece, color } = { ...boardCopy[move] }
                    // Make move
                    boardCopy[move] = boardCopy[idx];
                    boardCopy[idx] = { piece: null, color: null };
                    // Evaluate
                    bestVal = Math.max(minimax(
                        boardCopy, depth + 1, false, playing),
                        bestVal
                    );
                    // Undo move
                    boardCopy[idx] = boardCopy[move];
                    boardCopy[move] = { piece: piece, color: color };
                });
            }
        }
        return bestVal - depth;
    } else {
        let bestVal = Number.POSITIVE_INFINITY;
        for (let idx in boardCopy) {
            if (boardCopy[idx].piece !== null) {
                // Position has piece
                // Get possible moves
                const { row, col } = { ...getRowCol(idx) }
                const moves = possibleMoves(row, col, boardCopy)
                moves.forEach(move => {
                    // Store old value
                    const { piece, color } = { ...boardCopy[move] }
                    // Make move
                    boardCopy[move] = boardCopy[idx];
                    boardCopy[idx] = { piece: null, color: null };
                    // Evaluate
                    bestVal = Math.min(
                        minimax(boardCopy, depth + 1, true, playing),
                        bestVal
                    );
                    // Undo move
                    boardCopy[idx] = boardCopy[move];
                    boardCopy[move] = { piece: piece, color: color };
                });
            }
        }
        return bestVal + depth;
    }


}

// 4. Find best move
// For each possible move, apply minimax 
// algorithm to find best move
const findBestMove = (board: BoardType) => {

    // const boardCopy = { ...board };
    const boardCopy = JSON.parse(JSON.stringify(board)) as BoardType;

    let bestVal = Number.NEGATIVE_INFINITY;
    let moveVal: number;

    const bestMove = {
        from: '',
        to: '',
    };

    // Loop all moves, find the one with best value

    for (let idx in boardCopy) {
        if (boardCopy[idx].color === 'white') {
            // Position has piece
            // Get possible moves
            const { row, col } = { ...getRowCol(idx) }
            const moves = possibleMoves(row, col, boardCopy)
            moves.forEach(move => {
                // console.log(`Moving ${idx} to ${move}`)
                // Store old value
                const { piece, color } = { ...boardCopy[move] }
                // Make move
                boardCopy[move].piece = boardCopy[idx].piece;
                boardCopy[move].color = boardCopy[idx].color;
                boardCopy[idx] = { piece: null, color: null };
                // Evaluate
                moveVal = minimax(boardCopy, 0, false, 'white');
                // Undo move
                boardCopy[idx].piece = boardCopy[move].piece;
                boardCopy[idx].color = boardCopy[move].color;
                boardCopy[move] = { piece: piece, color: color };

                // If the value of the current move
                // is more than the best value, then
                // update best
                // console.log(`moveVal = ${moveVal}, bestVal = ${bestVal}`)
                if (moveVal > bestVal) {
                    bestMove.from = idx;
                    bestMove.to = move;
                    bestVal = moveVal;
                }
            });
        }
    }

    // console.log(`Best move from ${bestMove.from} to ${bestMove.to}`)

}

// 5. Apply best move

// End ai-player

export {
    findBestMove,
}