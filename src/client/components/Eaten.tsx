import React from 'react';

import styles from './Eaten.module.css';

interface Props {
    icon: string
}

const Eaten = ({ icon }: Props) => {
    return (<div className={styles.container}>
        {icon}
    </div>)
};

export default Eaten;