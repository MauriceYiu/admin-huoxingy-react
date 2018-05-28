import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import RouteMap from './router/RouteMap';
import 'antd/dist/antd.css';


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <RouteMap/>,
    document.getElementById('root')
);
registerServiceWorker();
