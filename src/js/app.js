import { Article } from '../components/Article.js';
import { Category } from '../components/Category.js';
import { dataSource } from './data.js';

const app = {
  //describe the source od data
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
    new Category();
  },
  init: function () {
    this.initArticles();
    this.initCategories();
  },
};

app.init();