import { getPostById, createPost, getPostsByOwner, deleteThatPost, editThatPost } from '../data.js';
import { showInfo, showError } from '../notification.js';

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs')
    };

    const post = await getPostById(this.params.objectId);
    const context = Object.assign(post, this.app.userData);
    //const context = Object.assign({ origin: encodeURIComponent('#/my_movies') }, this.app.userData);

    this.partial('./templates/post/details.hbs', context);
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        post: await this.load('./templates/post/post.hbs')
    };
    const post = await getPostById(this.params.objectId);
    const posts = await getPostsByOwner();
    const data = Object.assign({ posts }, this.app.userData)
    const context = Object.assign(post, data);
    this.partial('./templates/post/edit.hbs', context);
}

export async function editPost() {
    try {
        const post = {
            title: this.params.title,
            category: this.params.category,
            content: this.params.content
        }

        const result = await editThatPost(this.params.objectId, post);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully edited movie!');
        this.redirect(`#/details/${this.params.objectId}`);
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function create() {
    try {
        if (this.params.title.length < 3) {
            throw new Error('Title must be at least 3 characters long');
        }

        const post = {
            title: this.params.title,
            category: this.params.category,
            content: this.params.content
        }

        const result = await createPost(post);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully added post!');
        this.redirect('#/');
    } catch (err) {
        console.log(err);
        showError(err.message);
    }
}

export async function deletePost() {
    try {

        const result = await deleteThatPost(this.params.objectId);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully deleted post!');
        this.redirect('#/');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}