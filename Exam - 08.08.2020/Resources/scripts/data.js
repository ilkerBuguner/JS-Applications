import { beginRequest, endRequest, showError } from './notification.js';
import API from './api.js';

const endpoints = {
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
};

const api = new API(
    '1E58F4D2-89CC-4BB5-FF45-C631CCCE5700',
    '544160A2-3960-44DC-89F6-ACC8D1C7DE25',
    beginRequest,
    endRequest
)

export const apiLogin = api.login.bind(api);
export const apiRegister = api.register.bind(api);
export const apiLogout = api.logout.bind(api);

export async function getMoviesByOwner() {
    beginRequest();

    const ownerId = localStorage.getItem('userId');

    const result = api.get(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`);

    endRequest();

    return result;
}

export async function getMovies(search) {
    beginRequest();
    let result;
    if(!search) {
        result = await api.get(endpoints.MOVIES);
    } else {
        result = await api.get(endpoints.MOVIES + `?where=${escape(`title LIKE '%${search}%'`)}`);
    }

    endRequest();

    return result;
}

export async function getMovieById(objectId) {
    beginRequest();
    const result = await api.get(endpoints.MOVIE_BY_ID + objectId);
    endRequest();
    return result;
}

export async function createMovie(movie) {
    beginRequest();
    const result = await api.post(endpoints.MOVIES, movie)
    endRequest();
    return result;
}

export async function editMovie(objectId, movie) {
    beginRequest();
    const result = await api.put(endpoints.MOVIE_BY_ID + objectId, movie)
    endRequest();
    return result;
}


export async function deleteMovie(objectId) {
    beginRequest();
    const result = await api.delete(endpoints.MOVIE_BY_ID + objectId)
    endRequest();
    return result;
}