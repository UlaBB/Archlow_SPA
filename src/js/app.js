import { Article } from '../components/Article.js';
import { dataSource } from './data.js';
import { select } from './settings.js';

const app = {
  //describe the source of data
  initData: function () {
    this.data = dataSource;
  },
  initArticles: function () {
    this.initData();

    for (let articleData in this.data.articles) {
      new Article(this.data.articles[articleData].id, this.data.articles[articleData]);
    }
  },
  initCategories: function () {
    this.initData();

    const categories = [];
    const wrapperCategory = document.querySelector(select.wrapperOf.category);
    wrapperCategory.innerHTML = '';

    for (let articleData in this.data.articles) {
      const element = this.data.articles[articleData].categoryTitle;
      const categoryLink = '<option value="' + element + '">' + element + '</option>';
      if (categories.indexOf(categoryLink) === -1) {
        categories.push(categoryLink);
      }
    }
    wrapperCategory.innerHTML = categories.sort().join(' ');
  },
  initTags: function () {

  },
  init: function () {
    this.initArticles();
    this.initCategories();
  },
};

app.init();