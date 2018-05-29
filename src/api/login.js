import instance from './index';

// 登录api
export const login = (data) => {
    return instance({
        url: 'login',
        method: 'POST',
        auth: data
    }).then(res => {
        if (res) {
            try {
                if (res.status === 200) {
                    return Promise.resolve(res.data);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    });
}