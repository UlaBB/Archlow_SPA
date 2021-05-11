import { utils } from '../js/utils.js';
import { dataSource } from '../js/data.js';

const select = {
  templateOf: {
    articles: '#template-article-link',
  },
  containerOf: {
    articles: '.posts .container',
  }
};

const templates = {
  articles: Handlebars.compile(document.querySelector(select.templateOf.articles).innerHTML),
};

class Article {
  constructor(id, data) {
    const thisArticle = this;
    thisArticle.id = id;
    thisArticle.data = data;
    thisArticle.renderArticle();
  }
  renderArticle() {
    const thisArticle = this;
    const generatedHTML = templates.articles(thisArticle.data);
    thisArticle.element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.containerOf.articles);
    menuContainer.appendChild(thisArticle.element);
  }
}


const app = {
  initData: function () {
    const thisApp = this;
    thisApp.data = dataSource;
  },
  initArticles: function () {
    const thisApp = this;
    for (let articleData in thisApp.data.articles) {
      new Article(articleData, thisApp.data.articles[articleData]);
    }

  },

  init: function () {


    app.initData();
    app.initArticles();
  }
};


app.init();