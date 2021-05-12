


export class Category {
    constructor() {
        this.generateCategories();
    }

    generateCategories() {
        const articles = document.querySelectorAll('.post');
        const categories = [];
        for (let article of articles) {
            const category = article.getAttribute('data-category');
            if (categories.indexOf(category) === -1) {
                categories.push(category);
            }
        }
        console.log(categories);
    }
    // }


    // console.log(category);
    // const categories = [];
    // if (categories.indexOf(category) === -1) {
    //     categories.push(category);
    // }
    // console.log(categories);

    //push to array category if doesnt exist
    //element of array push to html dom as category

}
