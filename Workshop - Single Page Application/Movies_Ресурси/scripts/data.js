import {beginRequest, endRequest, showError} from './notification.js';
import API from './api.js';

const endpoints = {
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
};

const api = new API(
    'D3FF8817-58FD-9097-FF5F-8FDE8FBD8F00',
    '670B55A8-C128-4AD2-9DAC-036BE1E6297F',
    beginRequest,
    endRequest
)

export const apiLogin = api.login.bind(api);
export const apiRegister = api.register.bind(api);
export const apiLogout = api.logout.bind(api);

export async function getMovies(search) {
    beginRequest();
    let result;
    if(!search) {
        result = await api.get(endpoints.MOVIES);
    } else {
        result = await api.get(endpoints.MOVIES + `?where=${escape(`genres LIKE '%${search}%'`)}`);
    }

    endRequest();

    return result;
}

export async function getMovieByOwner() {
    beginRequest();

    const ownerId = localStorage.getItem('userId');

    const result = api.get(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`);

    endRequest();

    return result;
}

export async function createMovie(movie) {
    beginRequest();
    const result = await api.post(endpoints.MOVIES, movie)
    endRequest();
    return result;
}

export async function getMovieById(id) {
    beginRequest();
    const result = await api.get(endpoints.MOVIE_BY_ID + id)
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

export async function buyTicket(movie) {
    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId
    beginRequest();
    const result = await api.put(endpoints.MOVIE_BY_ID + movieId, {tickets: newTickets});
    endRequest();
    return result;
}