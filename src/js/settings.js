export const select = {
  templateOf: {
    articles: '#template-article-link',
  },
  containerOf: {
    articles: '.posts .container',
  },
  wrapperOf: {
    article: '.post',
    category: '.category__item',
  },
  itemOf: {
    option: '.category__item option',
  }

};

export const classNames = {
  articles: {
    active: 'post__active',
  }
}




export const templates = {
  articles: Handlebars.compile(document.querySelector(select.templateOf.articles).innerHTML),
};