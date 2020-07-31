export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs')
    };
    if(this.app.userData.loggedIn) {
        this.partial('./templates/homeLoggedIn.hbs', this.app.userData);
    } else {
        this.partial('./templates/home.hbs', this.app.userData);
    }
}