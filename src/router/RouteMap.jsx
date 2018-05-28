import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './../containers/App';
import Login from './../containers/login/Login';

class RouteMap extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRedirect to='/login' />
                    <Route path='/login' component={Login} />
                </Route>
            </Router>
        );
    }
}

export default RouteMap;