import instance from '../http/index.js';

export const visitorApplication = (account, password) => {
    return instance.post('/visitors/application', { account: account, password: password });
}
export const visitorLogin = (account, password) => {
    return instance.post('/visitors/login', { account: account, password: password });
}