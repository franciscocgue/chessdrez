import React from 'react';

import styles from './Eaten.module.css';

interface Props {
    piece: string,
    color: 'white' | 'black',
    family: string,
    idx: number,
}

const Eaten = ({ piece, color, family, idx }: Props) => {
    return (<div key={idx} className={`${piece === null ? styles['container-empty'] : styles.container}`}>
        {piece && <img className={styles['icon-img-' + piece]} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${family}${piece}${color}.png`} />}
        {!piece && '?'}
    </div>)
};

export default Eaten;