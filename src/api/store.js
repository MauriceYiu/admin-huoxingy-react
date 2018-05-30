import instance from './index';

// 登陆后进行获取商铺列表的接口调用
export const getStoreList = () => {
    return instance({
        url: 'stores',
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

export const getStoreInfo = (storeId) => {
    return instance({
        url: 'stores/'+storeId,
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