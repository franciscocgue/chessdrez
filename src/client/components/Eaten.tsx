import React from 'react';

import styles from './Eaten.module.css';

interface Props {
    icon: string,
    idx: number,
}

const Eaten = ({ icon, idx }: Props) => {
    return (<div key={idx} className={styles.container}>
        {icon}
    </div>)
};

export default Eaten;