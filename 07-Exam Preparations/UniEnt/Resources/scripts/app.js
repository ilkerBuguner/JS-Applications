import home from './controllers/home.js';
import register, { registerPost } from './controllers/register.js';
import login, { loginPost } from './controllers/login.js';
import logout from './controllers/logout.js';

window.addEventListener('load', () => {
    const app = Sammy('#root', function() {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || ''
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

        //this.post('#/create', ctx => { create.call(ctx); });

        //this.get('#/details/:objectId', details);

        //this.get('#/edit/:objectId', edit);
        //this.post('#/edit/:objectId', ctx => { editPost.call(ctx); });

        //this.get('#/delete/:objectId', deletePost);
    });

    app.run();
});