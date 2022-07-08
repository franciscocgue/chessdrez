import React, { useEffect, useState } from 'react';
import { BoardType } from '../utils/types';
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
    shadows: string[],
    onUpdateBoard: (dragging: string, draggingOver: string) => void,
    onDragStart: (row: number, col: number) => void,
    onDragEnter: (row: number, col: number) => void,
    onDragExitBoard: () => void,
    onDropOutsideBoard: () => void,
    onCellEntered: (row: number, col: number) => void
}

const GameContext = React.createContext<GameContextType>({
    board: boardInitial,
    dragging: null,
    draggingOver: null,
    playing: 'white',
    shadowEnabled: true,
    shadows: [],
    onUpdateBoard: (dragging: string, draggingOver: string) => { },
    onDragStart: (row: number, col: number) => { },
    onDragEnter: (row: number, col: number) => { },
    onDragExitBoard: () => { },
    onDropOutsideBoard: () => { },
    onCellEntered: (row: number, col: number) => { },
});

interface PropsType {
    children: JSX.Element
}

export const GameContextProvider: React.FC<PropsType> = ({ children }) => {

    const [board, setBoard] = useState(boardInitial)
    const [playing, setPlaying] = useState('white')
    const [dragging, setDragging] = useState(null)
    const [draggingOver, setDraggingOver] = useState(null)
    const [shadowEnabled, setShadowEnabled] = useState(true)
    const [shadows, setShadows] = useState([])

    useEffect(() => {
        console.log(board)
    }, [board])

    const onUpdateBoardHandler = (dragging: string, draggingOver: string) => {
        if (dragging in boardInitial && draggingOver in boardInitial) {
            const draggingRowCol = getRowCol(dragging);
            const moves = possibleMoves(draggingRowCol.row, draggingRowCol.col, board);
            if (moves.includes(draggingOver)) {
                // update board
                setBoard(prev => {
                    const newBoard = { ...prev };
                    newBoard[draggingOver] = { piece: prev[dragging].piece, color: prev[dragging].color }
                    newBoard[dragging] = { piece: null, color: null }
                    return newBoard;
                })
                setDragging(null);
                setDraggingOver(null);
                setPlaying(prev => prev === 'white' ? 'black' : 'white')
            }
        }
    }

    const onDragStartHandler = (row: number, col: number) => {
        const coordinates = getCoords(row, col);
        setDragging(coordinates);
        console.log('start dragging: ' + coordinates)
    }

    const onDragEnterHandler = (row: number, col: number) => {
        const coordinates = getCoords(row, col);
        setDraggingOver(coordinates);
        console.log('entered: ' + coordinates)
    }

    const onDragExitBoardHandler = () => {
        setDraggingOver(null);
        console.log('exited board')
    }

    const onCellEnteredHandler = (row: number, col: number) => {
        setShadows(possibleMoves(row, col, board))
    }

    const onDropOutsideBoardHandler = () => {
        setShadows([]);
    }

    // @TODO
    // 
    // onMouseEnter, and if not dragging (dragging === null): setShadows(possibleMoves(row, col, board))
    // 
    // onDrop: setDragging(null); setDraggingOver(null);


    return (
        <GameContext.Provider
            value={{
                board: board,
                dragging: dragging,
                draggingOver: draggingOver,
                playing: 'white',
                shadowEnabled: shadowEnabled,
                shadows: shadows,
                onUpdateBoard: onUpdateBoardHandler,
                onDragStart: onDragStartHandler,
                onDragEnter: onDragEnterHandler,
                onDragExitBoard: onDragExitBoardHandler,
                onDropOutsideBoard: onDropOutsideBoardHandler,
                onCellEntered: onCellEnteredHandler,
            }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext;