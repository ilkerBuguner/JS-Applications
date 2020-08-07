import { createRecipe, getRecipeById, editRecipe, deleteRecipe } from '../data.js';
import { showInfo, showError } from '../notification.js';

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/recipes/create.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const recipe = {
            meal: this.params.meal,
            ingredients: this.params.ingredients.split(',').map(i => i.trim(i)),
            prepMethod: this.params.prepMethod,
            description: this.params.description,
            foodImageURL: this.params.foodImageURL,
            likes: 0,
            category: this.params.category,
            categoryImageURL: 'https://i.insider.com/5d0bc2a0e3ecba03841d82d2?width=960&format=jpeg'
        };

        if (recipe.meal.length < 4) {
            throw new Error('Meal must be at least 4 characters long');
        }

        if (recipe.ingredients.length < 2) {
            throw new Error('Ingredients must be at least 2');
        }
        if (recipe.prepMethod.length < 10) {
            throw new Error('Prep Method must be at least 10 characters long');
        }
        if (recipe.description.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        }
        if (recipe.category == 'Select category...') {
            throw new Error('Please select category!');
        }

        if(recipe.foodImageURL.slice(0,7) != 'http://' && recipe.foodImageURL.slice(0,8) != 'https://') {
            throw new Error('Invalid image URL');
        }

        const result = await createRecipe(recipe);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Recipe shared successfully!');
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

    const recipe = await getRecipeById(this.params.objectId);
    const context = Object.assign(recipe, this.app.userData);
    if(this.app.userData.userId == recipe.ownerId) {
        context.isOwner = true;
    }
    //const context = Object.assign({ origin: encodeURIComponent('#/my_movies') }, this.app.userData);

    this.partial('./templates/recipes/details.hbs', context);
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    const recipe = await getRecipeById(this.params.objectId);
    const context = Object.assign(recipe, this.app.userData);

    await this.partial('./templates/recipes/edit.hbs', context);

    document.querySelectorAll('select[name=category]>option').forEach(o => {
        if(o.textContent == recipe.category) {
            o.selected = true;
        };
    });
}

export async function editPost() {
    try {
        const recipe = {
            meal: this.params.meal,
            ingredients: this.params.ingredients.split(',').map(i => i.trim(i)),
            prepMethod: this.params.prepMethod,
            description: this.params.description,
            foodImageURL: this.params.foodImageURL,
            category: this.params.category
        };

        if (recipe.meal.length < 4) {
            throw new Error('Meal must be at least 4 characters long');
        }

        if (recipe.ingredients.length < 2) {
            throw new Error('Ingredients must be at least 2');
        }
        if (recipe.prepMethod.length < 10) {
            throw new Error('Prep Method must be at least 10 characters long');
        }
        if (recipe.description.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        }
        if (recipe.category == 'Select category...') {
            throw new Error('Please select category!');
        }

        if(recipe.foodImageURL.slice(0,7) != 'http://' && recipe.foodImageURL.slice(0,8) != 'https://') {
            throw new Error('Invalid image URL');
        }

        const result = await editRecipe(this.params.objectId, recipe);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Recipe edited successfully!');
        this.redirect('#/');
    } catch (err) {
        showError(err.message);
    }
}

export async function deletePost() {
    try {

        const result = await deleteRecipe(this.params.objectId);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('Your recipe was archived.');
        this.redirect('#/home');
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}

export async function likeRecipe() {
    try {
        const recipe = await getRecipeById(this.params.objectId);
        recipe.likes = Number(recipe.likes) + 1;
        const result = await editRecipe(this.params.objectId, recipe);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo('You liked the recipe successfully.');
        this.redirect(`#/details/${this.params.objectId}`);
    } catch(err) {
        console.log(err);
        showError(err.message);
    }
}