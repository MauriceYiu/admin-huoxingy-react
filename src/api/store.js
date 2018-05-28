import instance from './index';

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