import { createArticle, getArticleById, deleteArticle, editArticle } from '../data.js';
import { showInfo, showError } from '../notification.js';

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/article/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        if (this.params.title.length < 3) {
            throw new Error('Title must be at least 3 characters long');
        }

        const post = {
            title: this.params.title,
            category: this.params.category,
            content: this.params.content
        }

        const result = await createArticle(post);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully added article!');
        this.redirect('#/');
    } catch (err) {
        console.log(err);
        showError(err.message);
    }
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const article = await getArticleById(this.params.objectId);
    const context = Object.assign(article, this.app.userData);
    //const context = Object.assign({ origin: encodeURIComponent('#/my_movies') }, this.app.userData);

    this.partial('./templates/article/details.hbs', context);
}

export async function deletePost() {
    try {

        const result = await deleteArticle(this.params.objectId);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully deleted article!');
        this.redirect('#/home');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    const article = await getArticleById(this.params.objectId);
    const context = Object.assign(article, this.app.userData);
    this.partial('./templates/article/edit.hbs', context);
}

export async function editPost() {
    try {
        const article = {
            title: this.params.title,
            category: this.params.category,
            content: this.params.content
        }

        const result = await editArticle(this.params.objectId, article);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully edited article!');
        this.redirect(`#/details/${this.params.objectId}`);
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}