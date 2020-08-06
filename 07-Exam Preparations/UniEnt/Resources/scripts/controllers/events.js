import { createEvent, getEventById, editEvent, deleteEvent } from '../data.js'
import { showInfo, showError } from '../notification.js';

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/events/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        if (this.params.name.length < 6) {
            throw new Error('Name must be at least 6 characters long');
        }

        if (this.params.description.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        }

        if(this.params.imageURL.slice(0,7) != 'http://' && this.params.imageURL.slice(0,8) != 'https://') {
            throw new Error('Invalid image URL');
        }

        const event = {
            name: this.params.name,
            dateTime: this.params.dateTime,
            description: this.params.description,
            imageURL: this.params.imageURL,
            organizer: this.app.userData.username
        };

        const result = await createEvent(event);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Event created successfully.');
        this.redirect('#/');
    } catch (err) {
        showError(err.message);
    }
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const event = await getEventById(this.params.objectId);
    const context = Object.assign(event, this.app.userData);
    if(this.app.userData.username == event.organizer) {
        context.isOwner = true;
    }
    //const context = Object.assign({ origin: encodeURIComponent('#/my_movies') }, this.app.userData);

    this.partial('./templates/events/details.hbs', context);
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    const event = await getEventById(this.params.objectId);
    const context = Object.assign(event, this.app.userData);
    this.partial('./templates/events/edit.hbs', context);
}

export async function editPost() {
    try {
        if (this.params.name.length < 6) {
            throw new Error('Name must be at least 6 characters long');
        }

        if (this.params.description.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        }

        if(this.params.imageURL.slice(0,7) != 'http://' && this.params.imageURL.slice(0,8) != 'https://') {
            throw new Error('Invalid image URL');
        }

        const event = {
            name: this.params.name,
            dateTime: this.params.dateTime,
            description: this.params.description,
            imageURL: this.params.imageURL,
        };

        const result = await editEvent(this.params.objectId, event);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Event edited successfully.');
        this.redirect(`#/details/${this.params.objectId}`);
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function joinEvent() {
    try {
        const event = await getEventById(this.params.objectId);
        event.interestedIn = Number(event.interestedIn) + 1;
        const result = await editEvent(this.params.objectId, event);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('You join the event successfully.');
        this.redirect(`#/details/${this.params.objectId}`);
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function deletePost() {
    try {

        const result = await deleteEvent(this.params.objectId);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Event closed successfully.');
        this.redirect('#/home');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}