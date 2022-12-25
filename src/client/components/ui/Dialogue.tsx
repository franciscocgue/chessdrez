import React from 'react';
import styles from './Dialogue.module.css'

interface Props {
    icon: any,
    iconSide: 'left' | 'right',
    children: JSX.Element,
}

const Dialogue = ({ icon, iconSide, children }: Props) => {
    return (
        <div className={styles['container-'+iconSide]}>
            {iconSide === 'left' ?
                <>
                    <div className={styles['icon-'+iconSide]}>
                        <img src={icon}></img>
                    </div>
                    <div className={styles.text}>
                        {children}
                    </div>
                </>
                :
                <>
                    <div className={styles.text}>
                        {children}
                    </div>
                    <div className={styles['icon-'+iconSide]}>
                        <img src={icon}></img>
                    </div>
                </>}
        </div>
    )
}

export default Dialogue;