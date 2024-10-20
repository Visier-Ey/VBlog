import instance from '../http/index.js';

export const visitorApplication = (account, password) => {
    return instance.post('/visitors/application', {account: account, password: password});
}

export const visitorLogin = (account, password) => {
    return instance.post('/visitors/login', {account: account, password: password});
}
// get account from the token,no need to pass the account
export const getVisitorProfile = () => {
    return instance.get('/visitors/profile');
}

export const updateVisitorProfile = (profile) => {
    return instance.put('/visitors/profile', profile);
}