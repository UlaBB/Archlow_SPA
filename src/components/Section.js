import { select, templates } from '../js/settings.js';
import { utils } from '../js/utils.js';

export class Section {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.renderSection();

    }
    renderSection() {
        const generatedHTML = templates.sections(this.data);
        this.element = utils.createDOMFromHTML(generatedHTML);
        const sectionContainer = document.querySelector(select.containerOf.sections);
        sectionContainer.appendChild(this.element);
    }
}