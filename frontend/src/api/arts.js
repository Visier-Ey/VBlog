import instance from '../http/index.js';

export const getBlogs = () => {
    return instance.get('/arts/blogs');
}

export const getPoetry = () => {
    return instance.get('/arts/poetry');
}