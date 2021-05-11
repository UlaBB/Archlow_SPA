'use strict';

const opt = {
  articles: '.post',
};



function generateCategories() {
  const selectSelector = document.querySelector('.category__item');
  selectSelector.innerHTML = '';

  let categories = [];

  const categoriesSelector = document.querySelectorAll('.post__entry-content__link');
  for (let categorySelector of categoriesSelector) {
    const nameCategory = categorySelector.innerHTML;
    const linkHtml = '<option value="' + nameCategory + '">' + nameCategory + '</option>';
    if (categories.indexOf(linkHtml) === -1) {
      categories.push(linkHtml);
    }
  }
  selectSelector.innerHTML = categories.sort().join(' ');
}

function filterCategories() {
  const categories = document.querySelectorAll('.category__item option');
  for (let category of categories) {
    category.addEventListener('click', function (e) {
      e.preventDefault();
      const nameCategory = category.innerHTML;

      const articles = document.querySelectorAll(opt.articles);
      for (let article of articles) {
        article.classList.remove('post__active');
        const properArticles = document.querySelectorAll('[data-category="' + nameCategory + '"]');
        for (let properArticle of properArticles) {
          properArticle.classList.add('post__active');
        }
      }
    });
  }
}

function generateAuthor() {
  const articles = document.querySelectorAll(opt.articles);
  for (let article of articles) {
    const author = article.getAttribute('data-author');
    const nameAuthor = article.querySelector('.post__author-info__text');
    nameAuthor.innerHTML = author;
  }
}

// function generateTagsInArticle() {
//   const articles = document.querySelectorAll(opt.articles);

//   for (let article of articles) {
//     const tagsArticleList = article.querySelector('.post__post-tags__list');
//     tagsArticleList.innerHTML = '';
//     let html = '';
//     const tagsArticle = article.getAttribute('data-tags');
//     const singleTagsArticle = tagsArticle.split(' ');
//     for (let singleTag of singleTagsArticle) {
//       const linkHtml = '<li class="post__post-tags__list__item"><a href="#' + singleTag + '">' + singleTag + '</a></li>';
//       html += linkHtml;
//     }
//     tagsArticleList.innerHTML = html;
//   }
// }

function calculateTagsParams(allTags) {

  const params = {
    min: 9999,
    max: 0,
  };
  for (let tag in allTags) {
    if ((allTags[tag]) < params.min) {
      params.min = allTags[tag];
    }
    if ((allTags[tag]) > params.max) {
      params.max = allTags[tag];
    }
  }
  return params;
}

//funckja decyduje o wielkości taga i nadaje im klase 
// chce miec 5 rodzajó 6 rodzajów klas
// min-1 , max-9  libcza 5- 4 /8 = 0.5 50%
//
function calculateTagClass(count, params) {

  const optCloudTag = 5;
  const normalizedCount = count - params.min;//7
  const normalizedMax = params.max - params.min;//8
  const properCount = normalizedCount / normalizedMax; //3.876
  const classNumber = Math.floor(properCount * (optCloudTag - 1) + 1);//4
  return classNumber;
}



function generateAllTagsList() {
  const tagList = document.querySelector('.tagsCloud__tags_List');
  tagList.innerHTML = '';

  let allTags = {};

  const articles = document.querySelectorAll(opt.articles);
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
  const tagsParams = calculateTagsParams(allTags);

  let allTagsHtml = '';
  for (let tag in allTags) {
    const tagLinkHtml = calculateTagClass(allTags[tag], tagsParams);
    const linkTag = '<li class="post-tags__list__item"><button class="btn btn__tag"><a href="#' + tag + '" class="tag-size-' + tagLinkHtml + '" >' + tag + '</a></button></li>';
    allTagsHtml += linkTag;
  }

  tagList.innerHTML = allTagsHtml;

}

// function filterArticles(customSelector = '') {
//   const articles = document.querySelectorAll(opt.articles);
//   for (let article of articles) {
//     article.classList.remove('post__active');
//   }
//   const properArticles = document.querySelectorAll(opt.articles + customSelector);
//   for (let properArticle of properArticles) {
//     properArticle.classList.add('post__active');
//   }
// }

// function filterArticleByTag() {
//   const tags = document.querySelectorAll('.post__post-tags__list__item a, .tagsCloud__tags_List a');
//   for (let tag of tags) {
//     tag.addEventListener('click', function (e) {
//       e.preventDefault();
//       const nameTag = tag.innerHTML;
//       filterArticles('[data-tags~="' + nameTag + '"]');
//     })
//   }
// }



function activeLupe() {
  const lupe = document.querySelector('.category__searchbutton');
  lupe.addEventListener('click', function (e) {
    e.preventDefault();
    const input = document.querySelector('#s');
    input.classList.toggle('category__input__active');
  });
}


function searchWord() {
  const input = document.querySelector('.category__field');
  const articlesText = [...document.querySelectorAll('.post__entry-content__link, .post__post-title, .post__entry-summer__text')];
  const articles = [...document.querySelectorAll('.post')];
  input.value = '';
  input.addEventListener('input', function (e) {
    e.preventDefault();
    const writtenText = e.target.value;
    let result = articlesText;
    result = articles.filter(articlesText => articlesText.textContent.includes(writtenText));

    articles.writtenText = '';

    for (let article of articles) {
      article.classList.remove('post__active');
    }
    for (let item of result) {
      item.classList.add('post__active');
    }
  });
}


const openToggler = () => {
  const toggler = document.querySelector('.nav__toggler');
  const navMenu = document.querySelector('.nav__menu');

  toggler.addEventListener('click', () => {
    navMenu.classList.toggle('nav__active');
  });
};

//========================================
// przyklad z eduWeb na dziedziczenie prototypowe
//===============================================

// function Shape(sideLenghts) {
//   this.__name = '';
//   this.__sideLenghts = sideLenghts;
// }
// Shape.prototype.getPerimeter = function () {
//   return this.__sideLenghts.reduce(function (prevVal, val) {
//     return prevVal + val;
//   });
// };
// Shape.prototype.getArea = function () {
//   return this.__sideLenghts[0] * this.__sideLenghts[1];
// };



// function Reactangle(sideLenghts) {
//   Shape.call(this, [sideLenghts[0], sideLenghts[1], sideLenghts[0], sideLenghts[1]]);
//   this.__name = 'Prostokat';
// }

// function Square(sideLenght) {
//   Reactangle.call(this, [sideLenght, sideLenght]);

//   this.__name = 'Kwadrat';

// }



openToggler();
activeLupe();
searchWord();
generateCategories();
filterCategories();
generateAuthor();
//generateTagsInArticle();
generateAllTagsList();
//filterArticleByTag();




