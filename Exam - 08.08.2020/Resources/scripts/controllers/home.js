import { getMovies } from '../data.js'

export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs')
    };

    if(this.app.userData.userId) {
        const search = this.params.search || '';
        const movies = await getMovies(search);
        const context = Object.assign({movies}, this.app.userData)
        this.partial('./templates/homeLoggedIn.hbs', context);
    } else {
        this.partial('./templates/home.hbs', this.app.userData);
    }
}