export const select = {
    templateOf: {
        articles: '#template-article-link',
    },
    containerOf: {
        articles: '.posts .container',
    }
};




export const templates = {
    articles: Handlebars.compile(document.querySelector(select.templateOf.articles).innerHTML),
};