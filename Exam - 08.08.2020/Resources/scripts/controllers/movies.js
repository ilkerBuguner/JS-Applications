import { createMovie, getMovieById, editMovie, deleteMovie } from '../data.js';
import { showInfo, showError } from '../notification.js';

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/movies/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const movie = {
            title: this.params.title,
            description: this.params.description,
            imageUrl: this.params.imageUrl,
            creator: this.app.userData.email,
            likes: 0,
            peopleLiked: []
        };

        if (movie.title.length <= 0) {
            throw new Error('Invalid inputs!');
        }

        if (movie.description.length <= 0) {
            throw new Error('Invalid inputs!');
        }
        if (movie.imageUrl.length <= 0) {
            throw new Error('Invalid inputs!');
        }

        const result = await createMovie(movie);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Created successfully!');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const movie = await getMovieById(this.params.objectId);
    
    const context = Object.assign(movie, this.app.userData);
    if(this.app.userData.userId == movie.ownerId) {
        context.isOwner = true;
    }
    if(movie.peopleLiked.includes(this.app.userData.email)) {
        context.isLiked = true;
    }

    this.partial('./templates/movies/details.hbs', context);
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    const movie = await getMovieById(this.params.objectId);
    const context = Object.assign(movie, this.app.userData);

    await this.partial('./templates/movies/edit.hbs', context);
}

export async function editPost() {
    try {
        const movie = {
            title: this.params.title,
            description: this.params.description,
            imageUrl: this.params.imageUrl,
            creator: this.app.userData.email
        };

        if (movie.title.length <= 0) {
            throw new Error('Invalid inputs!');
        }

        if (movie.description.length <= 0) {
            throw new Error('Invalid inputs!');
        }
        if (movie.imageUrl.length <= 0) {
            throw new Error('Invalid inputs!');
        }

        const result = await editMovie(this.params.objectId, movie);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Edited successfully');
        this.redirect(`#/details/${this.params.objectId}`);
    } catch (err) {
        showError(err.message);
    }
}

export async function deletePost() {
    try {

        const result = await deleteMovie(this.params.objectId);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Deleted successfully');
        this.redirect('#/home');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function likeMovie() {
    try {
        const movie = await getMovieById(this.params.objectId);
        movie.likes = Number(movie.likes) + 1;
        const peopleLiked = movie.peopleLiked;
        peopleLiked.push(this.app.userData.email)
        movie.peopleLiked = peopleLiked;
        const result = await editMovie(this.params.objectId, movie);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Liked successfully');
        this.redirect(`#/details/${this.params.objectId}`);
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}
