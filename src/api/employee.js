import instance from './index';

// 获取员工列表 enable表示是否启用
export const getEmployeeList = (storeId, enabled = true) => {
    return instance({
        url: 'employees',
        method: 'GET',
        params: {
            storeId,
            enabled
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

export const upBossPayCode = (storeId,fileInfo) => {
    return instance({
        url: `https://api.huoxingy.com/v1/image/json/upload?storeId=${storeId}`,
        method: 'POST',
        data:{
            file:fileInfo
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