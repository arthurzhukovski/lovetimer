import * as styles from './App.module.css';
import Timer from './components/Timer';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import React, {useState, useEffect, useRef} from 'react';
import StarsBackground from './components/StarsBackground';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import SwipeContainer from './components/SwipeContainer';

function App() {
    const routerRef = useRef();
    const routeComponentRef = useRef();
    const [routes, setRoutes] = useState([]);
    const [currentRouteIndex, setCurrentRouteIndex] = useState(null);
    useEffect(() => {
        fetch('routes.json').then(async routes => {
            routes = await routes.json().catch(() => []);
            setRoutes(routes);
            setCurrentRouteIndex(routes.findIndex(r => r.path === window.location.pathname))
        }).catch(() => {
            console.log('Необходимо добавить в корень файл с путями routes.json формата [{"path": "...", "utcDateTime": "YYYY-MM-DD HH:mm:ss", "label": "..."}, ...]')
        });
    }, []);

    useEffect(() => {
        console.log(routes[currentRouteIndex]);
        routerRef.current.history.push(routes[currentRouteIndex]?.path);
    }, [currentRouteIndex]);

    const changeRoute = (delta) => {
        let newIndex = currentRouteIndex + delta;
        newIndex = ((newIndex % routes.length) + routes.length) % routes.length;
        setCurrentRouteIndex(newIndex);
    };

    return (
        <div className={styles.app}>
            <StarsBackground/>
            <BrowserRouter ref={routerRef}>
                <Switch>
                    {routes.map((r, k) => <Route key={k} path={r.path} ref={routeComponentRef}>
                        <SwipeContainer callback={changeRoute}>
                            <Timer targetDateTimeString={r.utcDateTime} textLabel={r.label}/>
                        </SwipeContainer>
                    </Route>)}
                </Switch>
            </BrowserRouter>
            <HelmetProvider>
                <Helmet>
                    {routeComponentRef.current ? <>
                        <script src='/lib/TweenMax.min.js' type='text/javascript' />
                        <script src='/lib/msvg.js' type='text/javascript' />
                    </> : ''}
                </Helmet>
            </HelmetProvider>
        </div>
    );
}

export default App;
