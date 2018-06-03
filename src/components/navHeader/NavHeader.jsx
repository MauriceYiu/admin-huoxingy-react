import React, { Component } from 'react';
import './navHeader.scss';
import { Icon } from 'antd';
import { getStoreInfo } from './../../api/store';


class NavHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogInfo: false,
            username: '',
            storeInfo: {}
        };
        this.doShowLogInfo = this.doShowLogInfo.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    render() {
        const { showLogInfo, username, storeInfo } = this.state;
        const date = new Date(storeInfo.addTime);
        const createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const pathname = this.props.router.location.pathname;
        const routeInfo = pathname.split('/');
        let breadCrumbInfo = '';
        let breadCrumbIcon;
        switch (routeInfo[routeInfo.length - 1]) {
            case 'employee':
                breadCrumbIcon = <Icon type="team" />;
                breadCrumbInfo = '员工管理 / 员工列表';
                break;
            case 'achievement':
                breadCrumbIcon = <Icon type="team" />;
                breadCrumbInfo = '员工管理 / 员工业绩';
                break;
            default:
                breadCrumbIcon = <Icon type="home" />
                breadCrumbInfo = '首页';
                break;
        }
        return (
            <div id="nav-header">
                <span>
                    {breadCrumbIcon}{breadCrumbInfo}
                </span>
                <span className="right" onClick={this.doShowLogInfo}>
                    <Icon type="user" />
                </span>
                <div className={showLogInfo ? "logInFo show" : 'logInFo'}>
                    <div className="person-center">个人中心</div>
                    <div className="person-info">
                        <p className="store-name">店铺名称:{storeInfo.name}</p>
                        <p className="local-name">地理位置:{storeInfo.addr}</p>
                        <p className="create-time">创建时间:{createTime}</p>
                        <p className="login-phone">登录账户:{username}</p>
                    </div>
                    <div className="logout-btn">
                        <button onClick={this.logOut}>退出登录</button>
                    </div>
                </div>
            </div>
        );
    }
    doShowLogInfo() {
        this.setState({
            showLogInfo: !this.state.showLogInfo
        });
    }
    logOut() {
        this.props.router.push('/');
    }
    async componentDidMount() {
        const username = localStorage.getItem('username');
        const storeId = localStorage.getItem('storeId');
        const storeInfo = await getStoreInfo(storeId);
        this.setState({
            username,
            storeInfo
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default NavHeader;