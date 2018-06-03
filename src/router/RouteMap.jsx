import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './../containers/login/Login';
import Store from './../containers/store/Store';
import Sys from './../containers/sys/Sys';

class RouteMap extends Component {
    render() {
        const fakeAuth = () => {
            const token = localStorage.getItem('token');
            const storeId = localStorage.getItem('storeId');
            if (!token) {
                return false;
            }
            if (token && !storeId) {
                return false;
            }
            return true;
        }
        const fakeAuthForStore = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return false;
            }
            return true;
        }
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    fakeAuth() ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/"
                                }}
                            />
                        )
                }
            />
        );
        const PrivateRouteForStore = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    fakeAuthForStore() ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/"
                                }}
                            />
                        )
                }
            />
        );
        return (
            <Switch>
                <Route path='/' exact render={() => <Redirect to='/login' />} />
                <Route path='/login' component={Login} />
                <PrivateRouteForStore path='/store' component={Store} />
                <Route path='/sys' exact render={() => <Redirect to="/login" />} />
                <PrivateRoute path='/sys/:storeId' component={Sys} />
            </Switch>
        );
    }
}

export default RouteMap;