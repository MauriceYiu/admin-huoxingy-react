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

export const upBossPayCode = (storeId, fileInfo) => {
    return instance({
        url: `https://api.huoxingy.com/v1/image/json/upload?storeId=${storeId}`,
        method: 'POST',
        data: {
            file: fileInfo
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

// 获取当前店员信息

export const getShopManInfo = (storeId) => {
    return instance({
        url: `${storeId}/shopman`,
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

// 保存bossCode
export const saveBossCode = (storeId, aliPayUrl, wechatPayUrl, verifyCode = null) => {
    return instance({
        url: `${storeId}/shopman`,
        method: 'POST',
        data: {
            aliPayUrl,
            verifyCode,
            wechatPayUrl
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

// 获取职位列表
export const getJobList = (storeId) => {
    return instance({
        url: 'employee-groups',
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

// 添加员工
export const addEmp = ({aliPayUrl, code, groupId, id, mobile, name, storeId, target, wechatPayUrl}, verifyCode = null) => {
    return instance({
        url: 'employees',
        method: 'PUT',
        data: {
            aliPayUrl,
            code,
            groupId,
            id,
            mobile,
            name,
            storeId,
            target,
            wechatPayUrl,
            verifyCode
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

// 禁用员工
export const disableEmp = (storeId) => {
    return instance({
        url: 'employee-groups',
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