import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import RouteMap from './router/RouteMap';
import App from './containers/App';
import {HashRouter} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <HashRouter>
        <App>
            <RouteMap/>
        </App>
    </HashRouter>,
    document.getElementById('root')
);
registerServiceWorker();
