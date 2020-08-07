import { getRecipes } from "../data.js";

export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        recipe: await this.load('./templates/recipes/recipe.hbs')
    };

    if(this.app.userData.userId) {
        const recipes = await getRecipes();
        const context = Object.assign({recipes}, this.app.userData)
        this.partial('./templates/homeLoggedIn.hbs', context);
    } else {
        this.partial('./templates/home.hbs', this.app.userData);
    }
}