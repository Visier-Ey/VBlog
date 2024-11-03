import instance from '../http/index.js';



export const getNotices = () => {
    return instance.get('/recent/getNotices');
}

export const getEvents = () => {
    return instance.get('/recent/getEvents');
}

export const getAbout = () => {
    return instance.get('/recent/getAbout');
}
