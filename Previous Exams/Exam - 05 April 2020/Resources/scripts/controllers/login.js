import {apiLogin} from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function login() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/user/loginForm.hbs')
    };

    this.partial('./templates/user/login.hbs', this.app.userData);
}

export async function loginPost() {
    try {
        const result = await apiLogin(this.params.email, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;
        this.app.userData.loggedIn = true;

        showInfo(`Logged in as ${result.email}`);
        this.redirect('#/home');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}