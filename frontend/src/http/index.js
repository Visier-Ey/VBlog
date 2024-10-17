import axios from 'axios';
import {httpBaseUrl} from '../../custom.config';

const instance = axios.create({
    baseURL: httpBaseUrl,
    timeout: 6000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('jwtToken') || ''; // 从localStorage中获取令牌，如果没有则默认为空字符串

    if (token) {
        // 如果存在令牌，则将其添加到'Authorization'头部
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 返回配置（或Promise解析的配置）
    return config;
}, function (error) {
    // 对请求错误做些什么
    // 返回Promise.reject(error); // 可以选择性地处理错误或简单地返回它
    return Promise.reject(error); // 保持默认行为
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default instance;