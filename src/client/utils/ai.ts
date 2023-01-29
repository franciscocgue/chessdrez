import { BoardType } from "./types";
import { getRowCol, possibleMoves } from "./logic";
import { ImMoveDown } from "react-icons/im";

// Start ai-player

const maxDepth = 2;
const values = {
    peon: 100,
    alfil: 330,
    caballo: 320,
    torre: 500,
    reina: 900,
    rey: 20000
};


const positions = [
    '11', '12', '13', '14', '15', '16', '17', '18',
    '21', '22', '23', '24', '25', '26', '27', '28',
    '31', '32', '33', '34', '35', '36', '37', '38',
    '41', '42', '43', '44', '45', '46', '47', '48',
    '51', '52', '53', '54', '55', '56', '57', '58',
    '61', '62', '63', '64', '65', '66', '67', '68',
    '71', '72', '73', '74', '75', '76', '77', '78',
    '81', '82', '83', '84', '85', '86', '87', '88',
] as const;

// values copied from:
// https://www.chessprogramming.org/Simplified_Evaluation_Function#Pawns

// white based scores (black are reversed)
const rawScores = {
    peon: [
        0, 0, 0, 0, 0, 0, 0, 0,
        50, 50, 50, 50, 50, 50, 50, 50,
        10, 10, 20, 30, 30, 20, 10, 10,
        5, 5, 10, 25, 25, 10, 5, 5,
        0, 0, 0, 20, 20, 0, 0, 0,
        5, -5, -10, 0, 0, -10, -5, 5,
        5, 10, 10, -20, -20, 10, 10, 5,
        0, 0, 0, 0, 0, 0, 0, 0
    ],
    caballo: [
        -50, -40, -30, -30, -30, -30, -40, -50,
        -40, -20, 0, 0, 0, 0, -20, -40,
        -30, 0, 10, 15, 15, 10, 0, -30,
        -30, 5, 15, 20, 20, 15, 5, -30,
        -30, 0, 15, 20, 20, 15, 0, -30,
        -30, 5, 10, 15, 15, 10, 5, -30,
        -40, -20, 0, 5, 5, 0, -20, -40,
        -50, -40, -30, -30, -30, -30, -40, -50,
    ],
    alfil: [
        -20, -10, -10, -10, -10, -10, -10, -20,
        -10, 0, 0, 0, 0, 0, 0, -10,
        -10, 0, 5, 10, 10, 5, 0, -10,
        -10, 5, 5, 10, 10, 5, 5, -10,
        -10, 0, 10, 10, 10, 10, 0, -10,
        -10, 10, 10, 10, 10, 10, 10, -10,
        -10, 5, 0, 0, 0, 0, 5, -10,
        -20, -10, -10, -10, -10, -10, -10, -20,
    ],
    torre: [
        0, 0, 0, 0, 0, 0, 0, 0,
        5, 10, 10, 10, 10, 10, 10, 5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        -5, 0, 0, 0, 0, 0, 0, -5,
        0, 0, 0, 5, 5, 0, 0, 0
    ],
    reina: [
        -20, -10, -10, -5, -5, -10, -10, -20,
        -10, 0, 0, 0, 0, 0, 0, -10,
        -10, 0, 5, 5, 5, 5, 0, -10,
        -5, 0, 5, 5, 5, 5, 0, -5,
        0, 0, 5, 5, 5, 5, 0, -5,
        -10, 5, 5, 5, 5, 5, 0, -10,
        -10, 0, 5, 0, 0, 0, 0, -10,
        -20, -10, -10, -5, -5, -10, -10, -20
    ],
    rey: [
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -30, -40, -40, -50, -50, -40, -40, -30,
        -20, -30, -30, -40, -40, -30, -30, -20,
        -10, -20, -20, -20, -20, -20, -20, -10,
        20, 20, 0, 0, 0, 0, 20, 20,
        20, 30, 10, 0, 0, 10, 30, 20
    ],
}

// set type as any element within array
// https://steveholgado.com/typescript-types-from-arrays/

const positionalScore = (piece: keyof typeof rawScores, color: 'white' | 'black', position: typeof positions[number]) => {
    // returns score bonus from position
    if (color == 'white') {
        const idx = positions.indexOf(position);
        return rawScores[piece][idx];
    } else {
        // black
        // reverse positions
        // take advantage that game is symmetric in 'X axis'
        const idx = [...positions].reverse().indexOf(position);
        return rawScores[piece][idx];
    }
}


// Evaluate a given board status
const evaluate = (board: BoardType, playing: 'white' | 'black') => {
    // Ideally pieces should have different values in
    // different parts of the board; for simplicity, not so.
    const boardCopy = JSON.parse(JSON.stringify(board)) as BoardType;
    let score = 0;
    let bonus = 0;
    for (let idx in boardCopy) {
        if (boardCopy[idx].piece !== null) {
            if (boardCopy[idx].color == playing) {
                bonus = positionalScore(boardCopy[idx].piece, boardCopy[idx].color, idx as typeof positions[number])
                score += (values[boardCopy[idx].piece] + bonus)
            } else {
                bonus = positionalScore(boardCopy[idx].piece, boardCopy[idx].color, idx as typeof positions[number])
                score -= (values[boardCopy[idx].piece] - bonus)
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
                // console.log(`moveVal = ${moveVal}, bestVal = ${bestVal} - Moving ${idx} to ${move}`)
                if (moveVal > bestVal) {
                    bestMove.from = idx;
                    bestMove.to = move;
                    bestVal = moveVal;
                }
            });
        }
    }

    // console.log(`Best move from ${bestMove.from} to ${bestMove.to}`)

    return bestMove;

};

// End ai-player

export {
    findBestMove,
}