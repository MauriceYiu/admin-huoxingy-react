import React, { Component } from 'react';
import './navMenu.scss';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.goPage = this.goPage.bind(this);
        this.state = {
            openKeys: []
        }
        this.onOpenChange = this.onOpenChange.bind(this);
    }
    rootSubmenuKeys = ['employee', 'goods'];
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    }
    render() {
        const defaultSelectedKeys = this.props.router.location.pathname;
        const storeId = this.props.router.params.storeId;
        const subName = this.props.router.location.query.subName;
        return (
            <div id="nav-menu">
                <Menu
                    defaultSelectedKeys={[defaultSelectedKeys]}
                    mode="inline"
                    theme="dark"
                    onClick={this.goPage}
                    defaultOpenKeys={[subName]}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    <Menu.Item key={`/sys/${storeId}/statement`}>
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </Menu.Item>

                    <SubMenu key="employee" title={<span><Icon type="team" /><span>员工管理</span></span>}>
                        <Menu.Item key={`/sys/${storeId}/employee`}>员工列表</Menu.Item>
                        <Menu.Item key={`/sys/${storeId}/achievement`}>员工业绩</Menu.Item>
                    </SubMenu>

                    <SubMenu key="goods" title={<span><Icon type="inbox" /><span>商品管理</span></span>}>
                        <Menu.Item key={`/sys/${storeId}/goodsInfo`}>商品资料</Menu.Item>
                        <Menu.Item key={`/sys/${storeId}/goodsCate`}>商品分类</Menu.Item>
                        <Menu.Item key={`/sys/${storeId}/saleTime`}>销售时段管理</Menu.Item>
                        <Menu.Item key={`/sys/${storeId}/inventory`}>库存管理</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
    goPage({ keyPath }) {

        const pathname = this.props.router.location.pathname;

        let routerName = keyPath[0];
        // for(let i=keyPath.length-1;i>=0;i--){
        //     routerName+=keyPath[i];
        // }
        if (pathname === routerName) {
            return;
        }
        if (keyPath.length > 1) {
            this.props.router.push({ pathname: routerName, query: { subName: keyPath[keyPath.length-1] } });
        } else {
            this.props.router.push({ pathname: routerName });
            this.setState({
                openKeys:[]
            });
        }
    }
}

export default NavMenu;