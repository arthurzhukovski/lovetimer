import React, {useState} from 'react';
import * as styles from './Timer.module.css';
import moment from 'moment';
import useInterval from '../hooks/useInterval';
import TimeElement from './TimeElement';

const Timer = ({targetDateTimeString, textLabel}) => {
    moment.locale('ru');
    const initialMoment = moment.utc(targetDateTimeString, 'YYYY-MM-DD HH:mm:ss');
    let [duration, setDuration] = useState(null);

    useInterval(() => {
        const currentMoment = moment();
        setDuration(moment.duration(currentMoment.diff(initialMoment)));
    }, 1000);

    return (
        <div className={styles.wrapper}>
            {textLabel ? <div className={styles.textLabel}>{textLabel}</div> : ''}
            <div className={`${styles.timerElementsContainer} ${duration?.years() !== 0 ? styles.withYears : ''} ${duration?.months() !== 0 ? styles.withMonths : ''}` }>
                {duration?.years() !== 0 ? <TimeElement label='years' value={duration?.years()} /> : ''}
                {duration?.months() !== 0 ? <TimeElement label='months' value={duration?.months()} /> : ''}
                <TimeElement label='days' value={duration?.days()} />
                <TimeElement label='hours' value={duration?.hours()} />
                <TimeElement label='minutes' value={duration?.minutes()} />
                <TimeElement label='seconds' value={duration?.seconds()} />
            </div>
        </div>
    );
};

export default Timer;