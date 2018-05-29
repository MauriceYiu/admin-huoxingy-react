import React, { Component } from 'react';
import './login.scss';
import alertMessage from './../../utils/alertMessage';
import { login } from './../../api/login';
import { Base64 } from 'js-base64';
// import { CSSTransition } from 'react-transition-group';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // showLoginBox: false
            // username:'',
            // password:''
        }
        this.loginFun = this.loginFun.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    render() {
        // let { username, password, showLoginBox } = this.state;
        return (
            <div className="login">
                <div className="bg-mask"></div>
                {/* <CSSTransition
                    classNames="slide"
                    in={showLoginBox}
                > */}
                    <div className="login-box">
                        <h2>火星捕手后台管理系统</h2>
                        <input type="text" className="username" name="username" 
                            ref={(usernameInp)=>this.usernameInp = usernameInp} placeholder="请输入您的用户名..."
                            onKeyDown={this.handleKeyDown}
                        />
                        <input type="password" className="password" name="password"
                            ref={(passwordInp)=>this.passwordInp = passwordInp} placeholder="请输入您的密码..."
                            onKeyDown={this.handleKeyDown}
                        />
                        <button className="login-btn" onClick={this.loginFun}>登录</button>
                        <p className="info">
                            Maurice Yiu制作......
                        </p>
                    </div>
                {/* </CSSTransition> */}
            </div>
        );
    }
    componentDidMount() {
        localStorage.clear();
        this.setState({
            showLoginBox: true
        })
    }
    // 按压enter键进行登录
    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.loginFun();
        }
    }
    // 登录函数 用用户名和密码做权限验证，引入Base64 加密token
    async loginFun() {
        const username = this.usernameInp.value;
        const password = this.passwordInp.value;
        if (!username) {
            alertMessage.error('用户名不能为空...');
        }
        if (!password) {
            alertMessage.error('请输入密码...');
        }
        if (username && password) {
            if (/^1[3|4|5|7|8|9][0-9]{9}$/.test(username)) {
                let data = {
                    username,
                    password
                };
                let authStr = 'Basic ' + Base64.encode(username + ':' + password);
                try {
                    await login(data);
                    localStorage.setItem('token', authStr);
                    localStorage.setItem('username', username);
                    this.props.router.push('/store');
                } catch (error) {
                    alertMessage.error(error);
                }
            } else {
                alertMessage.error('手机格式不正确...');
            }
        }
    }
}

export default Login;