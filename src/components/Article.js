import { select, templates } from '../js/settings.js';
import { utils } from '../js/utils.js';

export class Article {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.renderArticle();
        //this.filterArticleByCategory();
    }
    renderArticle() {
        const generatedHTML = templates.articles(this.data);
        this.element = utils.createDOMFromHTML(generatedHTML);
        const articleContainer = document.querySelector(select.containerOf.articles);
        articleContainer.appendChild(this.element);
    }
    // filterArticleByCategory() {

    // }
}