
import { Article } from '../components/Article.js';
import { Section } from '../components/Section.js';
import { dataSource } from './data.js';
import { select, classNames } from './settings.js';

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
  initSections: function () {
    this.initData();

    for (let sectionData in this.data.sections) {
      new Section(this.data.sections[sectionData].id, this.data.sections[sectionData]);
    }


  },
 
  generateTagsInArticle: function () {
    const articles = document.querySelectorAll(select.wrapperOf.article);

    for (let article of articles) {
      const tagsArticleList = article.querySelector('.post__post-tags__list');
      tagsArticleList.innerHTML = '';
      let html = '';
      const tagsArticle = article.getAttribute('data-tags');
      const singleTagsArticle = tagsArticle.split(',');
      for (let singleTag of singleTagsArticle) {

        const linkHtml = '<li class="post__post-tags__list__item" data-singleTag="' + singleTag + '"> <a href="#' + singleTag + '">' + singleTag + '</a></li> ';
        html += linkHtml;
      }
      tagsArticleList.innerHTML = html;
    }
  },
  initTagsCloud: function () {
    const tagCloudWrapper = document.querySelector(select.wrapperOf.tagsCloud);
    tagCloudWrapper.innerHTML = '';

    let allTags = {};

    const articles = document.querySelectorAll(select.wrapperOf.article);


    for (let article of articles) {
      const tagsArticle = article.querySelectorAll('.post__post-tags li a');
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
      const linkTag = '<li class="post-tags__list__item"><button class="btn btn__tag"><a href="#' + tag + '" class="tag-size-' + tag + '" >' + tag + '</a></button></li>';
      allTagsHtml += linkTag;
    }
    tagCloudWrapper.innerHTML = allTagsHtml;

  },
  filterCategories: function () {
    const categories = document.querySelectorAll(select.itemOf.option);
    for (let category of categories) {
      category.addEventListener('click', function (e) {
        e.preventDefault();
        const nameCategory = category.innerHTML;

        const articles = document.querySelectorAll(select.wrapperOf.article);
        for (let article of articles) {
          article.classList.remove(classNames.articles.active);
          const properArticles = document.querySelectorAll('[data-category="' + nameCategory + '"]');
          for (let properArticle of properArticles) {
            properArticle.classList.add(classNames.articles.active);
          }
        }
      });
    }
  },
  filterArticles(customSelector = '') {

    const articles = document.querySelectorAll(select.wrapperOf.article);

    for (let article of articles) {
      article.classList.remove('post__active');
    }
    const properArticles = document.querySelectorAll((select.wrapperOf.article)[customSelector]);
    for (let properArticle of properArticles) {
      properArticle.classList.add('post__active');
    }
  },
  filterArticleByTag: function () {
    const tags = document.querySelectorAll('.post__post-tags__list__item a, .tagsCloud__tags_List a');
    for (let tag of tags) {
      tag.addEventListener('click', function (e) {
        e.preventDefault();
        const nameTag = tag.innerHTML;
        app.filterArticles('[data-singleTag~="' + nameTag + '"]');// zaznacz article>di .... zawiera id o nazwie
      });
    }
  },

  getElements: function () {
    this.startBtn = document.querySelector(select.buttonOf.startApp);
    this.backBtns = document.querySelectorAll(select.buttonOf.backStartPage);
    this.navPanelBtn = document.querySelector(select.buttonOf.navPanel);

    this.pagesContainer = document.querySelector(select.containerOf.pages);
    this.startPage = document.querySelector(select.pages.startPage);
    this.mainPage = document.querySelector(select.pages.mainPage);
    this.navLinksContainer = document.querySelectorAll(select.containerOf.navLinks);

    this.navPanel = document.querySelector(select.containerOf.navPanel);
  },

  initApp: function () {
    this.startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      app.startApp();
    });
  },

  startApp: function () {
    this.startPage.classList.remove(classNames.pages.active);
    this.mainPage.classList.add(classNames.pages.active);
  },

  backStartPage: function () {
    for (let backBtn of this.backBtns) {
      backBtn.addEventListener('click', e => {
        e.preventDefault();
        this.startPage.classList.add(classNames.pages.active);
        this.mainPage.classList.remove(classNames.pages.active);
      });
    }
  },

  iniNavPanel: function () {
    this.navPanelBtn.addEventListener('click', e => {
      e.preventDefault();
      this.navPanel.classList.toggle('open');
    });
  },

  closeNavPanel: function () {
    this.navPanel.addEventListener('click', e => {
      e.preventDefault();
      this.navPanel.classList.remove('open');
    });
  },

  initPages: function () {
    this.pages = Array.from(this.pagesContainer.children);
    this.navLinks = Array.from(this.navLinksContainer);

    let pagesMatchingHash = [];

    if (window.location.hash > 2) {
      const idFromHash = window.location.hash.replace('#/', '');
      pagesMatchingHash = this.pages.filter(function (page) {
        return page.id == idFromHash;
      });
    }
    console.log(pagesMatchingHash);
    for (let navLink of this.navLinks) {
      navLink.addEventListener('click', e => {
        e.preventDefault();
        const pageId = navLink.getAttribute('href').replace('#', '');
        this.startPage.classList.remove(classNames.pages.active);
        app.activePage(pageId);
      });
      console.log('pagesMatchingHash', pagesMatchingHash);
    }

    const startPageLink = '';
    app.activePage(pagesMatchingHash.length ? pagesMatchingHash[0].id : startPageLink);
  },

  activePage: function (pageId) {
    for (let page of this.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for (let navLink of this.navLinks) {
      navLink.classList.toggle(classNames.pages.active, navLink.getAttribute('href') == '#' + pageId);
    }

    window.location.hash = '#/' + pageId;

  },

  init: function () {
    this.getElements();
    this.initApp();
    this.backStartPage();
    this.iniNavPanel();
    this.closeNavPanel();
    this.initPages();
    this.initArticles();
    this.initCategories();
    this.initSections();
    //this.generateTagsInArticle();
    this.initTagsCloud();
    this.filterCategories();
    this.filterArticleByTag();

  }
};

app.init();