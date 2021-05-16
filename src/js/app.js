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
    this.initData();// ok czyli laduje dane

    const categories = [];
    const wrapperCategory = document.querySelector(select.wrapperOf.category);// parametr??!! miejsce gdzie beda wkladane wygenerowane linki z elementami
    wrapperCategory.innerHTML = '';//to bedzie ok

    for (let articleData in this.data.articles) {// this.data.articles trzeba podać jako parametr, problem bo to jest kilka elementow node, czy tak sie da żeby poźniej po tym iterować
      const element = this.data.articles[articleData].categoryTitle;// podac jako parametr do funkcji ??!!
      const categoryLink = '<option value="' + element + '">' + element + '</option>';// tutaj konstrukcja warunkowa if, option to zrob mi taki link..
      if (categories.indexOf(categoryLink) === -1) {
        categories.push(categoryLink);
      }
    }
    wrapperCategory.innerHTML = categories.sort().join(' ');
  },
  initTagsCloud() {
    const tagCloudWrapper = document.querySelector(select.wrapperOf.tagsCloud);
    tagCloudWrapper.innerHTML = '';

    let allTags = {};

    const articles = document.querySelectorAll(select.wrapperOf.article);
    console.log(articles);

    for (let article of articles) {
      const tagsArticle = article.querySelectorAll('.post__post-tags li a');
      console.log(tagsArticle);
      for (let tagArticle of tagsArticle) {
        const nameTag = tagArticle.innerHTML;
        if (!allTags.hasOwnProperty(nameTag)) {
          allTags[nameTag] = 1;
        }
        else {
          allTags[nameTag]++;
        }
      }
    }

    let allTagsHtml = '';
    for (let tag in allTags) {
      console.log(tag);
      const linkTag = '<li class="post-tags__list__item"><button class="btn btn__tag"><a href="#' + tag + '" class="tag-size-' + tag + '" >' + tag + '</a></button></li>';
      console.log(linkTag);
      allTagsHtml += linkTag;
    }
    tagCloudWrapper.innerHTML = allTagsHtml;

  },
  init: function () {
    this.initArticles();
    this.initCategories();
    this.initTagsCloud();
  },
};

app.init();