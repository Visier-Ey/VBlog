import instance from '../http/index.js';


export const getProjects = () => {
    return instance.get('/projects/list');
}