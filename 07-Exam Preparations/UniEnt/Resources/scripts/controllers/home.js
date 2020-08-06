import { getEvents } from "../data.js";

export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        event: await this.load('./templates/events/event.hbs')
    };

    if(this.app.userData.userId) {
        const events = await getEvents();
        const context = Object.assign({events}, this.app.userData)
        this.partial('./templates/homeLoggedIn.hbs', context);
    } else {
        this.partial('./templates/home.hbs', this.app.userData);
    }
}