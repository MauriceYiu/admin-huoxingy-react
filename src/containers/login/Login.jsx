import React, { Component } from 'react';
import './login.scss';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="bg-mask"></div>
                <div className="login-box">
                    <h2>火星捕手后台管理系统</h2>
                    <input type="text" className="username" name="username"  placeholder="请输入您的用户名..."/>
                    <input type="password" className="password" name="password"  placeholder="请输入您的密码..."/>
                    <button className="login-btn">登录</button>
                    <p className="info">
                        Maurice Yiu制作......
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;