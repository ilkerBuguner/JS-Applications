import {apiRegister} from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        registerForm: await this.load('./templates/user/registerForm.hbs')
    };

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function registerPost() {
    try {
        if(this.params.password !== this.params.repeatPassword) {
            throw new Error('Passwords must match');
        }
        if(this.params.password.length < 3) {
            throw new Error('Password must be atleast 3 characters');
        }
        if(this.params.email.length < 6) {
            throw new Error('Username must be atleast 6 characters');
        }

        const result = await apiRegister(this.params.email, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Succesfully registered!');
        this.redirect('#/login');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}