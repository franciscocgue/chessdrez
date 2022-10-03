import React, { useEffect, useState } from 'react';
import { BoardType, Cell, Move } from '../utils/types';
import { getCoords, possibleMoves, getRowCol } from '../utils/logic';

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

interface GameContextType {
    board: BoardType,
    dragging: string | null, // piece dragged (its cell coordinates)
    draggingOver: string | null, // cell coordinates over which piece is dragged
    playing: 'white' | 'black',
    shadowEnabled: true | false,
    showLastMove: true | false,
    shadows: string[],
    eaten: Cell[],
    history: Move[],
    onUpdateBoard: (dragging: string, draggingOver: string) => void,
    onDragStart: (row: number, col: number) => void,
    onDragEnter: (row: number, col: number) => void,
    onDragExitBoard: () => void,
    onDropOutsideBoard: () => void,
    onCellEntered: (row: number, col: number) => void,
    onToggleShadow: () => void,
    onToggleLastMove: () => void,
}

const GameContext = React.createContext<GameContextType>({
    board: boardInitial,
    dragging: null,
    draggingOver: null,
    playing: 'white',
    shadowEnabled: false,
    showLastMove: false,
    shadows: [],
    eaten: [],
    history: [],
    onUpdateBoard: (dragging: string, draggingOver: string) => { },
    onDragStart: (row: number, col: number) => { },
    onDragEnter: (row: number, col: number) => { },
    onDragExitBoard: () => { },
    onDropOutsideBoard: () => { },
    onCellEntered: (row: number, col: number) => { },
    onToggleShadow: () => { },
    onToggleLastMove: () => { },
});

interface PropsType {
    children: JSX.Element
}

export const GameContextProvider: React.FC<PropsType> = ({ children }) => {

    const [board, setBoard] = useState(boardInitial)
    const [playing, setPlaying] = useState<'white' | 'black'>('white')
    const [dragging, setDragging] = useState(null) // currently dragged piece coordinates
    const [draggingOver, setDraggingOver] = useState(null) // draggind-over coordinates
    const [history, setHistory] = useState([]);
    const [shadowEnabled, setShadowEnabled] = useState(false)
    const [showLastMove, setShowLastMove] = useState(false)
    const [shadows, setShadows] = useState([])
    const [eaten, setEaten] = useState([])

    useEffect(() => {
        console.log('board')
    }, [board])
    useEffect(() => {
        console.log('playing')
    }, [playing])
    useEffect(() => {
        console.log('dragging')
        console.log(dragging)
    }, [dragging])
    useEffect(() => {
        console.log('draggingOver')
        console.log(draggingOver)
    }, [draggingOver])
    useEffect(() => {
        console.log('shadowEnabled')
    }, [shadowEnabled])
    useEffect(() => {
        console.log('shadows')
    }, [shadows])
    useEffect(() => {
        console.log('eaten')
    }, [eaten])
    useEffect(() => {
        console.log('History: ', history)
    }, [history])

    const onUpdateBoardHandler = (dragging: string, draggingOver: string) => {
        // check if dragged inside board
        if (dragging in boardInitial && draggingOver in boardInitial) {
            const draggingRowCol = getRowCol(dragging);
            if (board[getCoords(draggingRowCol.row, draggingRowCol.col)].color === playing) {
                const moves = possibleMoves(draggingRowCol.row, draggingRowCol.col, board);
                // check move is valid
                if (moves.includes(draggingOver)) {
                    // if eaten piece, save
                    if (board[draggingOver].piece !== null) {
                        setEaten(prevEaten => {
                            console.log('______in')
                            const curr = [...prevEaten];
                            curr.push(board[draggingOver]);
                            return curr;
                        })
                    }
                    // update board
                    setBoard(prev => {
                        const newBoard = { ...prev };
                        console.log('______out')
                        newBoard[draggingOver] = { piece: prev[dragging].piece, color: prev[dragging].color }
                        newBoard[dragging] = { piece: null, color: null }
                        return newBoard;
                    })
                    // Update history
                    setHistory((prev) => {
                        const prevHistory = [...prev];
                        prevHistory.push({
                            pieceFrom: {
                                row: draggingRowCol.row,
                                col: draggingRowCol.col,
                                piece: board[dragging].piece,
                                color: board[dragging].color,
                            },
                            pieceTo: {
                                row: getRowCol(draggingOver).row,
                                col: getRowCol(draggingOver).col,
                                piece: board[dragging].piece,
                                color: board[dragging].color,
                            },
                        })
                        return prevHistory;
                    })
                    // Switch player
                    setPlaying(prev => prev === 'white' ? 'black' : 'white')
                };
            }
            setDragging(null);
            setDraggingOver(null);
            setShadows([]);
        }
    }

    const onDragStartHandler = (row: number, col: number) => {
        const coordinates = getCoords(row, col);
        if (board[getCoords(row, col)].color === playing) {
            setDragging(coordinates);
        }
        // console.log('start dragging: ' + coordinates)
    }

    const onDragEnterHandler = (row: number, col: number) => {
        const coordinates = getCoords(row, col);
        setDraggingOver(coordinates);
        // console.log('entered: ' + coordinates)
    }

    const onDragExitBoardHandler = () => {
        setDraggingOver(null);
        // console.log('exited board')
    }

    const onCellEnteredHandler = (row: number, col: number) => {
        if (shadowEnabled && dragging === null) {
            if (board[getCoords(row, col)].color === playing) {
                // check hovering over correct color (active turn)
                setShadows(possibleMoves(row, col, board))
            } else {
                setShadows([])
            }
        }
    }

    const onDropOutsideBoardHandler = () => {
        setDragging(null);
        setDraggingOver(null);
        if (shadowEnabled) {
            setShadows([]);
        }
    }

    const onToggleShadowHandler = () => {
        setShadowEnabled(!shadowEnabled);
    }

    const onToggleLastMoveHandler = () => {
        setShowLastMove(!showLastMove);
    }

    return (
        <GameContext.Provider
            value={{
                board: board,
                dragging: dragging,
                draggingOver: draggingOver,
                playing: playing,
                shadowEnabled: shadowEnabled,
                showLastMove: showLastMove,
                shadows: shadows,
                eaten: eaten,
                history: history,
                onUpdateBoard: onUpdateBoardHandler,
                onDragStart: onDragStartHandler,
                onDragEnter: onDragEnterHandler,
                onDragExitBoard: onDragExitBoardHandler,
                onDropOutsideBoard: onDropOutsideBoardHandler,
                onCellEntered: onCellEnteredHandler,
                onToggleShadow: onToggleShadowHandler,
                onToggleLastMove: onToggleLastMoveHandler,
            }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext;