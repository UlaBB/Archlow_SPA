export const select = {
  templateOf: {
    articles: '#template-article-link',
  },
  containerOf: {
    articles: '.post-articles',
    pages: '#pages',
  },
  wrapperOf: {
    article: '.post',
    category: '.category__item',
    tagsCloud: '.tagsCloud__tags_List',
  },
  itemOf: {
    option: '.category__item option, .post__entry-content__link',
    tags: '.post__post-tags__list__item',
  },
  nav: {
    links: '.nav__link',
  }
};

export const classNames = {
  articles: {
    active: 'post__active',
  },
  nav: {
    active: 'nav__active',
  },
  pages: {
    active: 'active',
  }
};


export const templates = {
  articles: Handlebars.compile(document.querySelector(select.templateOf.articles).innerHTML),
};