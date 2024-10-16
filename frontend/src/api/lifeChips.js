import instance from '../http/index.js';

export const getLifeChips = () => {
    return instance.get('/lifeChips/get');
}