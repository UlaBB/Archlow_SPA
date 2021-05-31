import { classNames, select, templates } from '../js/settings.js';
import { utils } from '../js/utils.js';

export class Section {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.renderSection();
        this.initAccordion();

    }
    renderSection() {
        const generatedHTML = templates.sections(this.data);
        this.element = utils.createDOMFromHTML(generatedHTML);
        const sectionContainer = document.querySelector(select.containerOf.sections);
        sectionContainer.appendChild(this.element);
    }

    initAccordion() {
        console.log(this.element);
        const clickableElement = this.element.querySelector('.section__con_text');
        const technicalOption = this.element.querySelector('.section__container_wrap');
        clickableElement.addEventListener('click', function (e) {
            e.preventDefault();
            technicalOption.classList.toggle(classNames.technicalCondWrapper.active);

            const activeSections = document.querySelectorAll(select.all.activeSections);

            console.log('active:', activeSections);


            for (let activeSection of activeSections) {
                if (activeSection != clickedSection) {
                    activeSection.classList.remove(classNames.technicalCondWrapper.active);
                }
            }
        });
    }
}