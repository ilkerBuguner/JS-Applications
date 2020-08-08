import home from './controllers/home.js';
import login, { loginPost } from './controllers/login.js';
import register, { registerPost } from './controllers/register.js';
import logout from './controllers/logout.js';
import {create, createPost, details, edit, editPost, deletePost, likeMovie} from './controllers/movies.js';

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: localStorage.getItem('email') || '',
            userId: localStorage.getItem('userId') || ''
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.post('#/register', ctx => { registerPost.call(ctx); });

        this.get('#/login', login);
        this.post('#/login', ctx => { loginPost.call(ctx); });
        this.get('#/logout', logout)

        this.get('#/create', create);
        this.post('#/create', ctx => { createPost.call(ctx); });

        this.get('#/details/:objectId', details);

        this.get('#/edit/:objectId', edit);
        this.post('#/edit/:objectId', ctx => { editPost.call(ctx); });

        this.get('#/delete/:objectId', deletePost);

        this.get('#/like/:objectId', likeMovie);
    });

    app.run();
});