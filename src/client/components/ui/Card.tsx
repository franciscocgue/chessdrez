import React, { useState } from 'react';
import { FaTools } from 'react-icons/fa';
import styles from './Card.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
    title: string,
    image: any,
    disabled?: true | false,
    note?: string,
    navToPath?: string,
    onClickAction?: () => void,
}

const Card = ({ title, image, disabled, note, navToPath, onClickAction }: Props) => {

    const [scalingclass, setScalingclass] = useState('');

    const navigate = useNavigate();

    return (
        <div onClick={e => {
            if (navToPath) {
                if (onClickAction) {
                    onClickAction();
                };
                navigate(navToPath);
            }
        }} className={styles.container}>
            <div className={styles.title}>
                <h2 className={`${disabled ? styles['disabled-text'] : ''}`}>{title}</h2>
                {note && <h4 className={`${disabled ? styles['disabled-text'] : ''}`}>{' '}{note}{' '}</h4>}
            </div>
            <div
                className={`${styles.content} ${scalingclass}`}
                onMouseEnter={e => setScalingclass(styles.scaleup)}
                onMouseLeave={e => setScalingclass(styles.scaledown)}
            >
                <img className={`${disabled ? styles['disabled-img'] : ''}`} src={image}></img>
            </div>
        </div>
    )
};

export default Card;