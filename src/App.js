import * as styles from './App.module.css';
import Timer from './components/Timer';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import React, {useState, useEffect} from 'react';
import StarsBackground from './components/StarsBackground';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        fetch('routes.json').then(async routes => {
            setRoutes(await routes.json().catch(() => []));
        }).catch(() => {
            console.log('Необходимо добавить в корень файл с путями routes.json формата [{"path": "...", "utcDateTime": "YYYY-MM-DD HH:mm:ss", "label": "..."}, ...]')
        });
    }, []);

    return (
        <div className={styles.app}>
            <StarsBackground/>
            <BrowserRouter basename='/'>
                <Switch>
                    {routes.map((r, k) => <Route key={k} exact path={r.path}>
                        <Timer targetDateTimeString={r.utcDateTime} textLabel={r.label}/>
                    </Route>)}
                </Switch>
            </BrowserRouter>
            <HelmetProvider>
                <Helmet>
                    {routes?.length ? <>
                        <script src='/lib/TweenMax.min.js' type='text/javascript' />
                        <script src='/lib/msvg.js' type='text/javascript' />
                    </> : ''}
                </Helmet>
            </HelmetProvider>
        </div>
    );
}

export default App;
