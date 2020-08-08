import {apiRegister, apiLogin} from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/user/registerForm.hbs')
    };

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function registerPost() {
    try {
        if(this.params.password !== this.params.repeatPassword) {
            throw new Error('Passwords must match');
        }
        if(this.params.password.length < 6) {
            throw new Error('Password must be atleast 6 characters');
        }
        if(this.params.email.length <= 0) {
            throw new Error('Email field is required');
        }

        const result = await apiRegister(this.params.email, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo(`Successful registration!`);

        const loginResult = await apiLogin(this.params.email, this.params.password);
        if(loginResult.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, loginResult);
            throw error;
        }

        this.app.userData.email = loginResult.email;
        this.app.userData.userId = loginResult.objectId;

        showInfo(`Login successful.`);
        this.redirect('#/home');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}