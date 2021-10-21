import React, {useEffect, useState} from 'react';
import * as styles from './TimeElement.module.css';
import NumberImage from './NumberImage';

const TimeElement = ({value, label}) => {
    value = value < 0 ? value * -1 : value;
    const [labels, setLabels] = useState({});
    const firstDigit = value?.toString().length > 1 ? value?.toString().slice(0, 1) : 0;
    const lastDigit = value?.toString().slice(-1);
    const labelChangeDelayMs = 800;
    useEffect(() => {
        const timeout = setTimeout(() => {
            if ((value >= 11 && value <= 19) || ['5','6','7','8','9','0'].indexOf(lastDigit) !== -1){
                setLabels({
                    years: 'лет',
                    months: 'месяцев',
                    days: 'дней',
                    hours: 'часов',
                    minutes: 'минут',
                    seconds: 'секунд',
                })
            }else if (['2','3','4'].indexOf(lastDigit) !== -1){
                setLabels({
                    years: 'года',
                    months: 'месяца',
                    days: 'дня',
                    hours: 'часа',
                    minutes: 'минуты',
                    seconds: 'секунды',
                })
            }else if (lastDigit === '1'){
                setLabels({
                    years: 'год',
                    months: 'месяц',
                    days: 'день',
                    hours: 'час',
                    minutes: 'минута',
                    seconds: 'секунда',
                })
            }
        }, labelChangeDelayMs);
        return () => {
            clearTimeout(timeout);
        }
    }, [value, lastDigit]);


    return (
        <div className={styles.wrapper}>
            <div className={styles.digits}>
                <NumberImage number={firstDigit}/>
                <NumberImage number={lastDigit}/>
            </div>
            <div className={styles.label}>{labels[label]}</div>
        </div>
    );
};

export default TimeElement;