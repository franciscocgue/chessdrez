import { BoardType } from "./types";
import { getRowCol, possibleMoves } from "./logic";
import { ImMoveDown } from "react-icons/im";

// Start ai-player

const maxDepth = 1;
const values = {
    peon: 100,
    alfil: 330,
    caballo: 320,
    torre: 500,
    reina: 900,
    rey: 20000
};

// Evaluate a given board status
const evaluate = (board: BoardType, playing: 'white' | 'black') => {
    // Ideally pieces should have different values in
    // different parts of the board; for simplicity, not so.
    const boardCopy = JSON.parse(JSON.stringify(board)) as BoardType;
    let score = 0;
    for (let idx in boardCopy) {
        if (boardCopy[idx].piece !== null) {
            if (boardCopy[idx].color == playing) {
                score += values[boardCopy[idx].piece]
            } else {
                score -= values[boardCopy[idx].piece]
            }
        }
    }
    return score;
};

const minimax = (board: BoardType, playing: 'white' | 'black', depth: number, isMax: true | false) => {
    // console.log(`depth__: ${depth}`)

    const boardCopy = JSON.parse(JSON.stringify(board)) as BoardType;

    if (depth >= maxDepth) {
        // console.log(`depth: ${depth}`)
        const score = evaluate(boardCopy, playing)
        // console.log(score)
        return score;
    }

    if (isMax) {
        let bestVal = Number.NEGATIVE_INFINITY;

        // Loop through a full branch until reaching node (max depth)
        for (let idx in boardCopy) {
            if (boardCopy[idx].color === playing) {
                // find possible moves
                const { row, col } = { ...getRowCol(idx) };
                const moves = possibleMoves(row, col, boardCopy);
                moves.forEach(move => {
                    // Initial info
                    const { piece: pMove, color: cMove } = { ...boardCopy[move] }
                    const { piece: pIdx, color: cIdx } = { ...boardCopy[idx] }
                    // Make move
                    boardCopy[move].piece = boardCopy[idx].piece;
                    boardCopy[move].color = boardCopy[idx].color;
                    boardCopy[idx] = { piece: null, color: null };
                    // Evaluate
                    bestVal = Math.max(minimax({ ...boardCopy }, playing, depth + 1, false), bestVal)
                    // Undo move
                    boardCopy[idx] = { piece: pIdx, color: cIdx };
                    boardCopy[move] = { piece: pMove, color: cMove };
                });
            }
        }
        return bestVal;
    } else {
        let bestVal = Number.POSITIVE_INFINITY;

        // Loop through a full branch until reaching node (max depth)
        for (let idx in boardCopy) {
            if (boardCopy[idx].color !== playing && boardCopy[idx].color !== null) {
                // find possible moves
                const { row, col } = { ...getRowCol(idx) };
                const moves = possibleMoves(row, col, boardCopy);
                moves.forEach(move => {
                    // Initial info
                    const { piece: pMove, color: cMove } = { ...boardCopy[move] }
                    const { piece: pIdx, color: cIdx } = { ...boardCopy[idx] }
                    // Make move
                    boardCopy[move].piece = boardCopy[idx].piece;
                    boardCopy[move].color = boardCopy[idx].color;
                    boardCopy[idx] = { piece: null, color: null };
                    // Evaluate
                    bestVal = Math.min(minimax({ ...boardCopy }, playing, depth + 1, true), bestVal)
                    // Undo move
                    boardCopy[idx] = { piece: pIdx, color: cIdx };
                    boardCopy[move] = { piece: pMove, color: cMove };
                });
            }
        }
        return bestVal;
    }

};

const findBestMove = (board: BoardType, playing: 'white' | 'black') => {

    const boardCopy = JSON.parse(JSON.stringify(board)) as BoardType;

    let bestVal = Number.NEGATIVE_INFINITY;
    let moveVal: number;

    const bestMove = {
        from: '',
        to: '',
    };

    // Loop through a full branch until reaching node (max depth)
    for (let idx in boardCopy) {
        if (boardCopy[idx].color === playing) {
            // find possible moves
            const { row, col } = { ...getRowCol(idx) };
            const moves = possibleMoves(row, col, boardCopy);
            moves.forEach(move => {
                // Initial info
                const { piece: pMove, color: cMove } = { ...boardCopy[move] }
                const { piece: pIdx, color: cIdx } = { ...boardCopy[idx] }
                // Make move
                boardCopy[move].piece = boardCopy[idx].piece;
                boardCopy[move].color = boardCopy[idx].color;
                boardCopy[idx] = { piece: null, color: null };
                // Evaluate
                moveVal = minimax({ ...boardCopy }, playing, 0, false);
                // console.log(`Value: ${moveVal} - Moving ${idx} to ${move}`)
                // Undo move
                boardCopy[idx] = { piece: pIdx, color: cIdx };
                boardCopy[move] = { piece: pMove, color: cMove };

                // If the value of the current move
                // is more than the best value, then
                // update best
                console.log(`moveVal = ${moveVal}, bestVal = ${bestVal} - Moving ${idx} to ${move}`)
                if (moveVal > bestVal) {
                    bestMove.from = idx;
                    bestMove.to = move;
                    bestVal = moveVal;
                }
            });
        }
    }

    console.log(`Best move from ${bestMove.from} to ${bestMove.to}`)

};

// End ai-player

export {
    findBestMove,
}