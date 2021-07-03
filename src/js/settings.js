export const select = {
  buttonOf: {
    initApp: '#btn__start',
    backStartPage: '#pages__icon__back',
    navPanel: '#loginPanel__sandwich',
  },
  pages: {
    mainPage: '#archlow',
    conditionsPage: '#warunkiTechniczne',
  },
  templateOf: {
    articles: '#template-article-link',
    sections: '#template-section-link',
  },
  containerOf: {
    articles: '.post-articles',
    pages: '#pages',
    navLinks: '.navPanel__list li a',
    sections: '.section__wrapper',
    navPanel: '#navPanel',
  },
  wrapperOf: {
    article: '.post',
    category: '.category__item',
    tagsCloud: '.tagsCloud__tags_List',
  },
  all: {
    activeSections: '.section__container.active'
  },

  itemOf: {
    option: '.category__item option, .post__entry-content__link',
    tags: '.post__post-tags__list__item',
    accordion: '.section__icon',
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
  },
  technicalCondWrapper: {
    active: 'active',
  }
};


export const templates = {
  articles: Handlebars.compile(document.querySelector(select.templateOf.articles).innerHTML),
  sections: Handlebars.compile(document.querySelector(select.templateOf.sections).innerHTML),
};