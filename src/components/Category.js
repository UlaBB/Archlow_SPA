
import { classNames, select } from '../js/settings.js';


export class Category {
  constructor() {

    this.generateCategories();
    this.filterArticlesByCategory();
  }

  generateCategories() {
    const articles = document.querySelectorAll(select.wrapperOf.article);
    const wrapperCategory = document.querySelector(select.wrapperOf.category);

    wrapperCategory.innerHTML = '';

    const categories = [];

    for (let article of articles) {
      const nameCategory = article.getAttribute('data-category');
      const linkHtml = '<option value="' + nameCategory + '">' + nameCategory + '</option>';
      if (categories.indexOf(linkHtml) === -1) {
        categories.push(linkHtml);
      }
    }
    console.log(categories);
    wrapperCategory.innerHTML = categories.sort().join(' ');
  }
  filterArticlesByCategory() {

    const categories = document.querySelectorAll(select.itemOf.option);
    console.log(categories);

    for (let category of categories) {
      category.addEventListener('click', function (e) {
        e.preventDefault();

        const categoryName = category.innerHTML;
        console.log(categoryName);

        const articles = document.querySelectorAll(select.wrapperOf.article);
        for (let article of articles) {
          article.classList.remove(classNames.articles.active);
          const properArticles = document.querySelectorAll('[data-category="' + categoryName + '"]');
          for (let properArticle of properArticles) {
            properArticle.classList.add(classNames.articles.active);
          }
        }
      });
    }
  }
}

