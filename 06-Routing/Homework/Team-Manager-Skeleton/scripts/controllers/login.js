import {login} from '../data.js'

export default async function() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    }
    this.partial('./templates/login/loginPage.hbs', this.app.userData);
}

export async function loginPost() {
    try {
        const result = await login(this.params.username, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const err = Error();
            Object.assign(err, result);
            throw err;
        }

        this.app.userData.loggedIn = true;
        this.app.userData.username = result.username;
        localStorage.setItem('userToken', result['user-token']);
        localStorage.setItem('username', result.username);

    } catch(err) {
        console.error(err);
        alert(err.message);
    }

    this.redirect('#/home');
} 