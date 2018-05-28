import React, { Component } from 'react';
import './sys.scss';

class Sys extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Sys;