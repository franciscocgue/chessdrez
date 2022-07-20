import React, {useContext} from 'react';
import Eaten from './Eaten';
import GameContext from '../store/game-context';

import styles from './EatenOnes.module.css';

const icon = {
    'white': {
        rey: '♔',
        reina: '♕',
        torre: '♖',
        alfil: '♗',
        caballo: '♘',
        peon: '♙',
    },
    'black': {
        rey: '♚',
        reina: '♛',
        torre: '♜',
        alfil: '♝',
        caballo: '♞',
        peon: '♟',
    }
}

interface Props {
    color: 'black' | 'white',
}

const EatenOnes = ({color} : Props) => {

    const gameCtx = useContext(GameContext);

    return (
        <div className={styles.container}>
                {gameCtx.eaten.filter(item => item.color === color).map(item => <Eaten icon={icon[item.color][item.piece]} />)}
        </div>
    )
};

export default EatenOnes;