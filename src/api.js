import axios from 'axios';
import { store } from './redux-store';

export const API = {
    baseURL: process.env.REACT_APP_API_URL,
    getApiToken: () => {
        const state = store.getState();
        return state?.auth?.user?.token;
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
    getErrorMessage: function(error) {
        return error?.response?.data?.message || error?.message || 'Unknown Error';
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
    },
    upsert: function (baseEndpoint, id = null, requestBody = {}, config = {}) {
        const method = parseInt(id) ? 'patch' : 'post';
        const url = parseInt(id) ? `${baseEndpoint}/${id}` : baseEndpoint;
        return this[method](url, requestBody, config);
    }
};