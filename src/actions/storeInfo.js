import * as actionTypes from './../constants/store';

export const saveStoreInfo = (storeInfo)=>{
    return {
        type:actionTypes.SAVE_STORE_INFO,
        storeInfo
    }
}