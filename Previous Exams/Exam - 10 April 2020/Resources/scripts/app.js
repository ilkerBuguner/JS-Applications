import home from './controllers/home.js';
import login, { loginPost } from './controllers/login.js';
import register, { registerPost } from './controllers/register.js'
import logout from './controllers/logout.js';

window.addEventListener('load', () => {
    const app = Sammy('#root', function() {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: localStorage.getItem('email') || '',
            userId: localStorage.getItem('userId') || '',
            loggedIn: false
        };

        this.get('/', home);
        this.get('index.html', home);
        this.get('#/home', home);

        this.get('#/register', register);
        this.post('#/register', ctx => { registerPost.call(ctx); });

        this.get('#/login', login);
        this.post('#/login', ctx => { loginPost.call(ctx); });
        this.get('#/logout', logout)

        //this.get('#/cinema', cinema);
        //this.get('#/my_movies', myMovies);
        //this.get('#/details/:objectId', details);

        //this.get('#/create', create)
        //this.post('#/create', ctx => { createPost.call(ctx); });

        //this.get('#/edit/:objectId', edit);
        //this.post('#/edit/:objectId', ctx => { editPost.call(ctx); });

        //this.get('#/delete/:objectId', deleteGet);
        //this.post('#/delete/:objectId', ctx => {deletePost.call(ctx); });

        //this.get('#/buy/:objectId', buyTicketGet);
    });

    app.run();
});