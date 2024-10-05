import instance from '../http/index.js';

export const getProfiles = () => {
    return instance.get('/users/profiles');
}

export const getUser = () => {
    return instance.get('/users/user');
}