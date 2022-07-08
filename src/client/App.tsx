import React, { useContext } from 'react';
import Board from './components/Board';
import GameContext from './store/game-context';

const App = () => {

    const gameCtx = useContext(GameContext);

    return (
        <div style={{height:'100vh'}} draggable
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
                // dropped out of board
                e.preventDefault()
                gameCtx.onDropOutsideBoard();
            }}
            onDragEnter={e => {
                e.preventDefault();
                gameCtx.onDragExitBoard();
            }}
        >
            <p>Hey, it works!</p>
            <Board />
        </div>
    )
};

export default App;