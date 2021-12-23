import React, {useState} from 'react';
import * as styles from './Timer.module.css';
import moment from 'moment';
import useInterval from '../hooks/useInterval';
import TimeElement from './TimeElement';
import * as momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

const Timer = ({targetDateTimeString, textLabel}) => {
    moment.locale('ru');
    const initialMoment = moment.utc(targetDateTimeString, 'YYYY-MM-DD HH:mm:ss');
    let [duration, setDuration] = useState([]);

    useInterval(() => {
        const currentMoment = moment.utc();
        let durationPartsArray = moment.duration(currentMoment.diff(initialMoment), 'milliseconds').format("YY:MM:DD:hh:mm:ss", { trim: false }).split(':');
        console.log(durationPartsArray)
        setDuration(durationPartsArray);

    }, 1000);

    return (
        <div className={styles.wrapper}>
            {textLabel ? <div className={styles.textLabel}>{textLabel}</div> : ''}
            <div className={`${styles.timerElementsContainer} ${parseInt(duration[1]) !== 0 ? styles.withYears : ''} ${parseInt(duration[1]) !== 0 ? styles.withMonths : ''}` }>
                {parseInt(duration[0]) !== 0 ? <TimeElement label='years' value={duration[0]} /> : ''}
                {parseInt(duration[1]) !== 0 ? <TimeElement label='months' value={duration[1]} /> : ''}
                <TimeElement label='days' value={duration[2]} />
                <TimeElement label='hours' value={duration[3]} />
                <TimeElement label='minutes' value={duration[4]} />
                <TimeElement label='seconds' value={duration[5]} />
            </div>
        </div>
    );
};

export default Timer;