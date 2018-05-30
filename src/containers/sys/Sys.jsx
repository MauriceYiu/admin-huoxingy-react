import React, { Component } from 'react';
import './sys.scss';
import NavHeader from './../../components/navHeader/NavHeader';
import NavMenu from './../../components/navMenu/NavMenu';

class Sys extends Component {
    render() {
        return (
            <div id="sys">
                <div className="left-menu">
                    <NavMenu router={this.props.router}/>
                </div>
                <div className="right-cont">
                    <div className="right-top">
                        <NavHeader router={this.props.router}/>
                    </div>
                    <div className="router-cont">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Sys;