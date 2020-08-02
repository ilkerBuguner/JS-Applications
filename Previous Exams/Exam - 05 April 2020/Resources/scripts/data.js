import { beginRequest, endRequest, showError } from './notification.js';
import API from './api.js';

const endpoints = {
    ARTICLES: 'data/articles',
    ARTICLE_BY_ID: 'data/articles/'
};

const api = new API(
    '8C84EFB7-4B09-D05F-FF01-E3FBD5241B00',
    'A4A04B34-46AB-4192-9F64-AA75647141EA',
    beginRequest,
    endRequest
)

export const apiLogin = api.login.bind(api);
export const apiRegister = api.register.bind(api);
export const apiLogout = api.logout.bind(api);

export async function getArticlesByOwner() {
    beginRequest();

    const ownerId = localStorage.getItem('userId');

    const result = api.get(endpoints.ARTICLES + `?where=ownerId%3D%27${ownerId}%27`);

    endRequest();

    return result;
}

export async function createArticle(article) {
    beginRequest();
    const result = await api.post(endpoints.ARTICLES, article)
    endRequest();
    return result;
}

export async function getArticleById(objectId) {
    beginRequest();
    const result = await api.get(endpoints.ARTICLE_BY_ID + objectId);
    endRequest();
    return result;
}

export async function deleteArticle(objectId) {
    beginRequest();
    const result = await api.delete(endpoints.ARTICLE_BY_ID + objectId)
    endRequest();
    return result;
}

export async function editArticle(objectId, article) {
    beginRequest();
    const result = await api.put(endpoints.ARTICLE_BY_ID + objectId, article)
    endRequest();
    return result;
}