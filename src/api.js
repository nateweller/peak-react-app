import axios from 'axios';
import { store } from './redux-store';

export const API = {
    baseURL: 'http://peak:8888/api',
    getApiToken: () => {
        const state = store.getState();
        return state?.global?.user?.token;
    },
    getDefaultRequestConfig: function() {
        const defaultConfig = {};
        const token = this.getApiToken();
        if (token) {
            defaultConfig.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        return defaultConfig;
    },
    get: function (endpoint, config) {
        return axios.get(`${this.baseURL}/${endpoint}`, {
            ...this.getDefaultRequestConfig(), 
            config
        });
    },
    post: function (endpoint, requestBody, config) {
        return axios.post(`${this.baseURL}/${endpoint}`, requestBody, {
            ...this.getDefaultRequestConfig(),
            config
        });
    },
    patch: function (endpoint, requestBody, config) {
        return axios.patch(`${this.baseURL}/${endpoint}`, requestBody, {
            ...this.getDefaultRequestConfig(),
            config
        });
    },
    delete: function (endpoint, config) {
        return axios.delete(`${this.baseURL}/${endpoint}`, {
            ...this.getDefaultRequestConfig(),
            config
        });
    }
};