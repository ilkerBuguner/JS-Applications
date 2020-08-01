import { getPostsByOwner } from '../data.js'

export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        post: await this.load('./templates/post/post.hbs')
    };

    if(this.app.userData.userId) {
        const posts = await getPostsByOwner();
        const context = Object.assign({posts}, this.app.userData)
        this.partial('./templates/homeLoggedIn.hbs', context);
    } else {
        this.partial('./templates/home.hbs', this.app.userData);
    }
}