import axios from 'axios';
import __store from '@/store';
import { normalizeTypeForEffect } from '@/state-management-composer/util';
import effects from '@/state-management-composer/effects';
import { baseURL } from '@/constants/PATH';
import { OK } from '@/constants/STATUS_CODE';


//注入__store来实现redux功能
const httpClient = axios.create({
    baseURL,
    retryDelay: 1000,
    __store
});
//设置请求拦截器,统一管理loading
httpClient.interceptors.request.use(config => {
    if (config.shouldLoading) {
        let target = config.target;
        effects.types.reduce((memo, type) => { memo[`${type}Effect`] = normalizeTypeForEffect({ effect: type, target }); return memo; }, config);
        config.__store.dispatch({ type: config.loadingEffect, target })
    }
    return config;
});

//设置响应拦截器,目的是请求出错,错误处理并重新请求,请求成功,状态码不是预期时错误处理
httpClient.interceptors.response.use(response => {
    //请求成功但是状态码不对时的错误状态反馈
    let { data, config } = response, error = config.error || config.createFeedback(data);
    if (data.code !== OK && error) {
        config.__store.dispatch({ type: config.failureEffect, payload: { error } });
    }
    return response;
}, error => {
    let config = error.config;
    config.__store.dispatch({ type: config.failureEffect, payload: { error } })
    if (!config || !config.retry) return Promise.reject(error);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount > config.retry) return Promise.reject(error);
    config.__retryCount += 1;
    let backUp = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, config.retryDelay || 1);
    });
    return backUp.then(() => httpClient(config));
});

export default httpClient;