import { Article } from '../components/Article.js';
import { dataSource } from './data.js';

const app = {
  //describe the source od data
  initData: function () {
    this.data = dataSource;
  },
  initArticles: function () {
    this.initData();

    for (let articleData in this.data.articles)
      new Article(this.data.articles[articleData].id, this.data.articles[articleData]);
  },
  init: function () {
    this.initArticles();
  },
};

app.init();