import { beginRequest, endRequest, showError } from './notification.js';
import API from './api.js';

const endpoints = {
    RECIPES: 'data/recipes',
    RECIPE_BY_ID: 'data/recipes/'
};

const api = new API(
    'A734DB8A-915B-E47E-FFF6-C9FEF2B19700',
    '14CF60B1-5330-4CCB-891D-3F1CBA59C93D',
    beginRequest,
    endRequest
)

export const apiLogin = api.login.bind(api);
export const apiRegister = api.register.bind(api);
export const apiLogout = api.logout.bind(api);

export async function getRecipesByOwner() {
    beginRequest();
    const ownerId = sessionStorage.getItem('userId');
    const result = api.get(endpoints.RECIPES + `?where=ownerId%3D%27${ownerId}%27`);
    endRequest();
    
    return result;
}

export async function getRecipes() {
    beginRequest();
    const result = await api.get(endpoints.RECIPES);
    endRequest();

    return result;
}

export async function getRecipeById(objectId) {
    beginRequest();
    const result = await api.get(endpoints.RECIPE_BY_ID + objectId);
    endRequest();
    return result;
}

export async function createRecipe(recipe) {
    beginRequest();
    const result = await api.post(endpoints.RECIPES, recipe)
    endRequest();
    return result;
}

export async function editRecipe(objectId, recipe) {
    beginRequest();
    const result = await api.put(endpoints.RECIPE_BY_ID + objectId, recipe)
    endRequest();
    return result;
}


export async function deleteRecipe(objectId) {
    beginRequest();
    const result = await api.delete(endpoints.RECIPE_BY_ID + objectId)
    endRequest();
    return result;
}