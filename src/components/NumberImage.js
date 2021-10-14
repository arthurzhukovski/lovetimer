import React, {useEffect, useRef} from 'react';
import {ReactComponent as Number} from '../assets/number.svg';
import * as styles from './NumberImage.module.css';


const NumberImage = ({number}) => {
    const numberRef = useRef(null);
    const numberAnimRef = useRef(null);
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            if(window.TimelineMax){
                const tl = new window.TimelineMax();
                const tl2 = new window.TimelineMax();
                tl.to(numberRef.current.getElementsByClassName(`number0`)[0], .5, {morphSVG: numberRef.current.getElementsByClassName(`number${number}`)[0], ease:window.Power3.easeInOut},'+=.5').play();
                tl2.to(numberAnimRef.current.getElementsByClassName(`number0`)[0], .5, {morphSVG: numberAnimRef.current.getElementsByClassName(`number${number}`)[0], ease:window.Power3.easeInOut},'+=.5').play();
            }
        }
    });
    return (
        <div className={styles.wrapper}>
            <Number ref={numberRef}/>
            <Number ref={numberAnimRef} className={styles.svgAnim}/>
        </div>
    );
};

export default NumberImage;