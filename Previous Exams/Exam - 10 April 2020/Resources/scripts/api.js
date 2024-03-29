export default class API {
    constructor(appId, apiKey, beginRequest, endRequest) {
        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoints = {
            REGISTER: 'users/register',
            LOGIN: 'users/login',
            LOGOUT: 'users/logout'
        };
        this.beginRequest = () => {
            if(beginRequest) {
                beginRequest();
            }
        };
        this.endRequest = () => {
            if(endRequest) {
                endRequest();
            }
        };
    }

    host(endpoint) {
        return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
    }

    getOptions(headers) {
        const token = localStorage.getItem('userToken');

        const options = {headers: headers || {} };

        if(token !== null) {
            Object.assign(options.headers, {'user-token': token});
        }

        return options;
    }

    async get(endpoint) {
        this.beginRequest();
        const result = (await fetch(this.host(endpoint), this.getOptions())).json();
        this.endRequest();

        return result;
    }

    async post(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': 'application/json'});

        options.method = 'POST';
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async put(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': 'application/json'});

        options.method = 'PUT';
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async delete(endpoint) {
        const options = this.getOptions();

        options.method = 'DELETE';

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async register(email, password) {
        return this.post(this.endpoints.REGISTER, {
            email,
            password
        });
    }

    async login(email, password) {
        const result = await this.post(this.endpoints.LOGIN, {
            login: email,
            password
        });

        localStorage.setItem('userToken', result['user-token']);
        localStorage.setItem('email', result.email);
        localStorage.setItem('userId', result.objectId);

        return result;
    }

    async logout() {
        this.beginRequest();
        const result = await fetch(this.host(this.endpoints.LOGOUT), this.getOptions());
        this.endRequest();

        localStorage.removeItem('userToken');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        return result;
    }
}