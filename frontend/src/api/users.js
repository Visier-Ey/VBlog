import instance from '../http/index.js';

export const getUser = () => {
    return instance.get('/user/get');
}