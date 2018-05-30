import React, { Component } from 'react';
import './navMenu.scss';
import { Menu, Icon } from 'antd';

class NavMenu extends Component {
    constructor(props){
        super(props);
        this.goPage = this.goPage.bind(this);
    }
    render() {
        const defaultSelectedKeys = this.props.router.location.pathname;
        const storeId = this.props.router.params.storeId;
        return (
            <div id="nav-menu">
                <Menu
                    defaultSelectedKeys={[defaultSelectedKeys]}
                    mode="inline"
                    theme="dark"
                    onClick={this.goPage}
                >
                    <Menu.Item key={`/sys/${storeId}/statement`}>
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </Menu.Item>
                    
                    <Menu.Item key={`/sys/${storeId}/statement2`}>
                        <Icon type="team" />
                        <span>员工管理</span>
                    </Menu.Item>
                    
                    <Menu.Item key={`/sys/${storeId}/statement3`}>
                        <Icon type="inbox" />
                        <span>商品管理</span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
    goPage({ keyPath }){
        const pathname = this.props.router.location.pathname;
        console.log(pathname)
        if(pathname === keyPath[0]){
            return;
        }
        this.props.router.push(keyPath[0])
    }
}

export default NavMenu;