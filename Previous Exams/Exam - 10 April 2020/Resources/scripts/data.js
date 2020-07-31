import {beginRequest, endRequest, showError} from './notification.js';
import API from './api.js';

const endpoints = {
    POSTS: 'data/posts',
    POST_BY_ID: 'data/posts/'
};

const api = new API(
    'A313B121-B89E-D7DE-FFAE-C3E9C8542F00',
    '9CD18F16-E5B1-4B18-9617-C7DDAD1C8827',
    beginRequest,
    endRequest
)

export const apiLogin = api.login.bind(api);
export const apiRegister = api.register.bind(api);
export const apiLogout = api.logout.bind(api);