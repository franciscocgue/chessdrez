import React, { useContext } from 'react';
import GameContext from '../store/game-context';
import styles from './Home.module.css';

import aiGame from '../assets/ai-game.png'
import p2pGame from '../assets/p2p-game.png'
import Card from './ui/Card';

const Home = () => {

    const gameCtx = useContext(GameContext);

    return (
        <div className={styles.container}>
            <div className={styles.options}>
                <Card
                    key={1}
                    image={aiGame}
                    title={'Beat the Machine'}
                    note={'New game'}
                    navToPath={'/chess/game'}
                    onClickAction={gameCtx.onStartAiGame}
                ></Card>
                <Card
                    key={2}
                    image={p2pGame}
                    title={'Device as Board'}
                    note={'New game'}
                    navToPath={'/chess/game'}
                    onClickAction={gameCtx.onStartGame}
                ></Card>
            </div>
        </div>
    )
}

export default Home; 