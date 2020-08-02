import { getArticlesByOwner } from '../data.js'

export default async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        article: await this.load('./templates/article/article.hbs')
    };

    const articles = await getArticlesByOwner();
    const jsArticles = articles.filter(article => article.category.toLowerCase() == 'javascript');
    const cSharpArticles = articles.filter(article => article.category.toLowerCase() == 'csharp');
    const javaArticles = articles.filter(article => article.category.toLowerCase() == 'java');
    const pythonArticles = articles.filter(article => article.category.toLowerCase() == 'python');

    const context = Object.assign({ }, this.app.userData, {jsArticles}, {cSharpArticles}, {javaArticles}, {pythonArticles});
    this.partial('./templates/home.hbs', context);
}