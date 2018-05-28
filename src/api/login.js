import instance from './index';

// 登录api
export const login = (data) => {
    return instance({
        url: 'login',
        method: 'POST',
        auth:data
    }).then(res => {
        if (res) {
            if (res.status === 200) {
                return Promise.resolve(res.data);
            }
        }
    });
}