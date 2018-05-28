import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import App from './../containers/App';
import Login from './../containers/login/Login';
import Store from './../containers/store/Store';
import Statement from './../containers/sys/subpages/statement/Statement';
import Sys from './../containers/sys/Sys';

class RouteMap extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRedirect to='/login' />
                    <Route path='/login' component={Login} />
                    <Route path='/store' component={Store} onEnter={this.checkAuthStore}/>
                    <Route path='/sys' component={Sys} onEnter={this.checkAuth}>
                        <IndexRoute component={Statement} />
                    </Route>
                </Route>
            </Router>
        );
    }
    checkAuthStore(){
        const token = localStorage.getItem('token');
        if(!token){
            hashHistory.push('/');
        }
    }
    checkAuth(){
        const token = localStorage.getItem('token');
        const storeId = localStorage.getItem('storeId');
        if(!token){
            hashHistory.push('/');
        }
        if(token&&!storeId){
            hashHistory.push('/');
        }
    }
}

export default RouteMap;