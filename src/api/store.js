import instance from './index';

// 登陆后进行获取商铺列表的接口调用
export const getStoreList = (data) => {
    return instance({
        url: 'stores',
        method: 'GET'
    }).then(res => {
        if (res) {
            if (res.status === 200) {
                return Promise.resolve(res.data);
            }
        }
    });
}