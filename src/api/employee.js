import instance from './index';

// 登录api
export const getEmployeeList = (storeId) => {
    return instance({
        url: 'employees',
        method: 'GET',
        params:{
            storeId
        }
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