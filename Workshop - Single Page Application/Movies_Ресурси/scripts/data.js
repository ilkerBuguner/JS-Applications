import {beginRequest, endRequest, showError} from './notification.js';
import API from './api.js';

const endpoints = {
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies'
};

const api = new API(
    'D3FF8817-58FD-9097-FF5F-8FDE8FBD8F00',
    '670B55A8-C128-4AD2-9DAC-036BE1E6297F',
    beginRequest,
    endRequest
)

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);