// 获取服务器响应code
import {
    hashHistory
} from 'react-router';
import {
    message
} from 'antd';

const errorInfo = (errInfo) => {
    message.error(errInfo);
};

let errInfo = '';

export default function (error) {
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        switch (error.response.status) {
            case 401:
                // window.location.href = window.location.href.split('#')[0] + '#/login';
                errInfo = "帐号失效，请重新登录";
                hashHistory.push('/');
                break;
            case 403:
                errInfo = "权限不足";
                break;
            case 404:
                errInfo = "请尽快上传资料";
                break;
            case 400:
                errInfo = "店员已存在";
                break;
            default:
                errInfo = "系统错误";
                break;
        }
        errorInfo(errInfo)
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
}