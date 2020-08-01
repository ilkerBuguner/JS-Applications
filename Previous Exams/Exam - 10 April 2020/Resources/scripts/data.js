import { beginRequest, endRequest, showError } from './notification.js';
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

export async function getPostsByOwner() {
    beginRequest();

    const ownerId = localStorage.getItem('userId');

    const result = api.get(endpoints.POSTS + `?where=ownerId%3D%27${ownerId}%27`);

    endRequest();

    return result;
}

export async function getPostById(objectId) {
    beginRequest();
    const result = await api.get(endpoints.POST_BY_ID + objectId);
    endRequest();
    return result;
}

export async function createPost(post) {
    beginRequest();
    const result = await api.post(endpoints.POSTS, post)
    endRequest();
    return result;
}

export async function editThatPost(objectId, movie) {
    beginRequest();
    const result = await api.put(endpoints.POST_BY_ID + objectId, movie)
    endRequest();
    return result;
}


export async function deleteThatPost(objectId) {
    beginRequest();
    const result = await api.delete(endpoints.POST_BY_ID + objectId)
    endRequest();
    return result;
}