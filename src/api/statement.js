import instance from './index';

// 登陆后进行获取商铺大数据最近七天
export const getStoreState = (storeId) => {
    return instance({
        url: `${storeId}/daily-member-statics`,
        method: 'GET'
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