import React from 'react';
import * as styles from './StarsBackground.module.css';

const StarsBackground = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.stars}></div>
            <div className={styles.stars2}></div>
            <div className={styles.stars3}></div>
        </div>
    );
};

export default StarsBackground;