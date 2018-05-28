import axios from 'axios';
import catchError from './../utils/catchError'

var instance = axios.create({
    baseURL: 'https://api.huoxingy.com/v1/admin/'
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.timeout = 5000;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
},catchError);

export default instance;