import * as styles from './App.module.css';
import Timer from './components/Timer';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import React from 'react';
import StarsBackground from './components/StarsBackground';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className={styles.app}>
        <StarsBackground/>
        <BrowserRouter basename='/'>
            <Switch>
                <Route exact path='/november-2021' >
                    <Timer targetDateTimeString='2021-11-20 00:10:00' textLabel={'Посадка в Минске в ноябре 2021 ❤️'}/>
                </Route>
                <Route>
                    <Timer/>
                </Route>
            </Switch>
        </BrowserRouter>
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
