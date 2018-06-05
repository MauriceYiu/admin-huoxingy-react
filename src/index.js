import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import RouteMap from './router/RouteMap';
import App from './containers/App';
import {HashRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App>
                <RouteMap/>
            </App>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
