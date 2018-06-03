import React, { Component } from 'react';
import './sys.scss';
import NavHeader from './../../components/navHeader/NavHeader';
import NavMenu from './../../components/navMenu/NavMenu';
import Statement from './subpages/statement/Statement';
import Employee from './subpages/employee/Employee';
import Achievement from './subpages/achievement/Achievement';
import { Route, Redirect, Switch } from 'react-router-dom';


class Sys extends Component {
    render() {
        const {match} = this.props;
        return (
            <div id="sys">
                <div className="left-menu">
                    <NavMenu router={this.props.history} match={this.props.match} location={this.props.location}/>
                </div>
                <div className="right-cont">
                    <div className="right-top">
                        <NavHeader router={this.props.history} />
                    </div>
                    <div className="router-cont">
                        <Switch>
                            <Route path='/sys' exact render={() => <Redirect to="/login" />} />
                            <Route path='/sys/:storeId' exact render={() => <Redirect to={`/sys/${match.params.storeId}/statement`} />} />
                            <Route path='/sys/:storeId/statement' component={Statement} />
                            <Route path='/sys/:storeId/employee' component={Employee} />
                            <Route path='/sys/:storeId/achievement' component={Achievement} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sys;