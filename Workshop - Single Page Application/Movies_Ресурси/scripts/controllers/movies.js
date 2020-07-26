import {getMovies, createMovie, getMovieByOwner, getMovieById, editMovie, deleteMovie, buyTicket} from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function cinema() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movie/movie.hbs')
    };
    const search = this.params.search || '';

    const movies = await getMovies(search);
    movies.sort((a, b) => Number(b.tickets) - Number(a.tickets));
    this.app.userData.movies = movies;
    const context = Object.assign({ origin: encodeURIComponent('#/cinema'), search }, this.app.userData);

    this.partial('./templates/movie/cinema.hbs', context);
}

export async function myMovies() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        myMovie: await this.load('./templates/movie/myMovie.hbs')
    };

    const movies = await getMovieByOwner();
    this.app.userData.movies = movies;
    //const context = Object.assign({ origin: encodeURIComponent('#/my_movies') }, this.app.userData);

    this.partial('./templates/movie/myMovies.hbs', this.app.userData);
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movie = await getMovieById(this.params.objectId);
    const context = Object.assign(movie, this.app.userData);
    //const context = Object.assign({ origin: encodeURIComponent('#/my_movies') }, this.app.userData);

    this.partial('./templates/movie/details.hbs', context);
}

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/movie/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        if(this.params.title.length < 6) {
            throw new Error('Title must be at least 6 characters long');
        }
        if(this.params.description.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        }
        if(!Number.isInteger(Number(this.params.tickets))) {
            throw new Error('Tickets count must be a number');
        }

        const movie = {
            title: this.params.title,
            image: this.params.imageUrl,
            description: this.params.description,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        }

        const result = await createMovie(movie);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully added movie!');
        this.redirect('#/cinema');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };
    const movie = await getMovieById(this.params.objectId);
    const context = Object.assign(movie, this.app.userData);
    this.partial('./templates/movie/edit.hbs', context);
}

export async function editPost() {
    try {
        const movie = {
            title: this.params.title,
            image: this.params.imageUrl,
            description: this.params.description,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        }

        const result = await editMovie(this.params.objectId, movie);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully edited movie!');
        this.redirect('#/my_movies');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function deleteGet() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };
    const movie = await getMovieById(this.params.objectId);
    const context = Object.assign(movie, this.app.userData);
    this.partial('./templates/movie/delete.hbs', context);
} 

export async function deletePost() {
    try {

        const result = await deleteMovie(this.params.objectId);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully deleted movie!');
        this.redirect('#/my_movies');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function buyTicketGet() {
    try {
        const movie = await getMovieById(this.params.objectId);
        const result = await buyTicket(movie);
        if(result.hasOwnProperty('errorData') || movie.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully deleted movie!');
        this.redirect('#/cinema');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}