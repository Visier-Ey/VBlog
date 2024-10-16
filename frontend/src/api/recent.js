import instance from '../http/index.js';

export const getComments = () => {
    return instance.get('/recent/comments');
}


