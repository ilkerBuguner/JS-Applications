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
        if(this.params.firstName.length < 2) {
            throw new Error('First name must be atleast 2 characters');
        }
        if(this.params.lastName.length < 2) {
            throw new Error('Last name must be atleast 2 characters');
        }
        if(this.params.username.length < 3) {
            throw new Error('Username must be atleast 3 characters');
        }
        if(this.params.password.length < 6) {
            throw new Error('Password must be atleast 6 characters');
        }
        if(this.params.password !== this.params.repeatPassword) {
            throw new Error('Passwords must match');
        }
        let result = await apiRegister(this.params.firstName,
            this.params.lastName,
            this.params.username,
            this.params.password);

        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        result = await apiLogin(this.params.username, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.app.userData.names = sessionStorage.getItem('names');
        this.app.userData.userId = result.objectId;

        showInfo(`User registration successful!`);
        this.redirect('#/home');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}