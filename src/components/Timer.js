import React, {useState, useEffect} from 'react';
import * as styles from './Timer.module.css';
import moment from 'moment';
import useInterval from '../hooks/useInterval';
import TimeElement from './TimeElement';
import NumberImage from './NumberImage';

const Timer = () => {
    moment.locale('ru');
    const KJAOffset = -4;
    const initialMoment = moment.utc('2021-10-02 03:00:00', 'YYYY-MM-DD HH:mm:ss');

    let [duration, setDuration] = useState(null);

    useInterval(() => {
        const currentMoment = moment();
        setDuration(moment.duration(currentMoment.diff(initialMoment)));
        console.log(initialMoment, currentMoment);
    }, 1000);

    return (
        <div className={styles.wrapper}>
            <div>
                <div className={`${styles.timerElementsContainer} ${duration?.years() > 0 ? styles.withYears : ''} ${duration?.months() > 0 ? styles.withMonths : ''}` }>
                    {duration?.years() ? <TimeElement label='years' value={duration?.years()} /> : ''}
                    {duration?.months() ? <TimeElement label='months' value={duration?.months()} /> : ''}
                    <TimeElement label='days' value={duration?.days()} />
                    <TimeElement label='hours' value={duration?.hours()} />
                    <TimeElement label='minutes' value={duration?.minutes()} />
                    <TimeElement label='seconds' value={duration?.seconds()} />
                </div>
            </div>
        </div>
    );
};

export default Timer;