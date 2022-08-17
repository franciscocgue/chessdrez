import React, { useContext } from 'react';
import Eaten from './Eaten';
import GameContext from '../store/game-context';

import styles from './EatenOnes.module.css';
import Cell from './Cell';

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
    },
    null: {
        null: '?'
    }
}

interface Props {
    color: 'black' | 'white',
}

const EatenOnes = ({ color }: Props) => {

    const gameCtx = useContext(GameContext);

    let emptyCells = [];
    for (let ii = 0; ii > gameCtx.eaten.filter(item => item.color === color).length - 16; ii--) {
        emptyCells.push({ piece: null, color: null });
    }
    let component = gameCtx.eaten.filter(item => item.color === color).concat(emptyCells).map((item, idx) => <Eaten key={item.piece ? idx : idx + 16} idx={item.piece ? idx : idx + 16} icon={icon[item.color][item.piece]} />);

    return (
        <div className={styles.container}>
            {/* {gameCtx.eaten.filter(item => item.color === color).map((item, idx) => <Eaten key={idx} idx={idx} icon={icon[item.color][item.piece]} />)} */}
            {component}
        </div>
    )
};

export default EatenOnes;