import * as actionTypes from './../constants/store';

const initialState = '';

export default function storeInfo(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SAVE_STORE_INFO:
            state = action.storeInfo;
            return state;
        default:
            return state;
    }
}