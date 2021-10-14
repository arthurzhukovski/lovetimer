import * as styles from './App.module.css';
import Timer from './components/Timer';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import React from 'react';
import StarsBackground from './components/StarsBackground';

function App() {
  return (
    <div className={styles.app}>
        <StarsBackground/>
        <Timer/>
        <HelmetProvider>
            <Helmet>
                <script src='/lib/TweenMax.min.js' type='text/javascript' />
                <script src='/lib/msvg.js' type='text/javascript' />
            </Helmet>
        </HelmetProvider>
    </div>
  );
}

export default App;
