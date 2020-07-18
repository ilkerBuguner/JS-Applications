import home from './controllers/home.js';
import about from './controllers/about.js';
import login from './controllers/login.js';
import register from './controllers/register.js';
import catalog from './controllers/catalog.js';

$(() => {
    const app = Sammy('#main', function() {
        this.use('Handlebars', 'hbs');
        this.userData = {
            loggedIn: true,
            hasTeam: false
        };

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/about', about);

        this.get('#/register', register);

        this.get('#/login', login);

        this.get('#/catalog', catalog);
    });

    app.run();
});