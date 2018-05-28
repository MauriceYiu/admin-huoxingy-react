import {
    message
} from 'antd';

const error = (errInfo) => {
    message.error(errInfo);
};

const success = (sucInfo) => {
    message.success(sucInfo);
};

const warning = (warnInfo) => {
    message.warning(warnInfo);
};

export default {
    error,
    success,
    warning
}