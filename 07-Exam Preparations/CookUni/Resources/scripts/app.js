import home from './controllers/home.js';
import register, { registerPost } from './controllers/register.js';
import login, { loginPost } from './controllers/login.js';
import logout from './controllers/logout.js';
import { create, createPost, details, edit, editPost, deletePost, likeRecipe } from './controllers/recipes.js';

window.addEventListener('load', () => {
    const app = Sammy('#rooter', function() {
        this.use('Handlebars', 'hbs');

        this.userData = {
            names: sessionStorage.getItem('names') || '',
            userId: sessionStorage.getItem('userId') || ''
        };
        console.log('works');
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
        this.get('#/like/:objectId', likeRecipe);
        this.get('#/delete/:objectId', deletePost);
    });

    app.run();
});