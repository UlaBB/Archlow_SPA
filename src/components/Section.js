import { classNames, select, templates } from '../js/settings.js';
import { utils } from '../js/utils.js';

export class Section {
  constructor(id, data) {

    this.id = id;
    this.data = data;

    this.renderSection();
    this.getElements();
    this.initAccordion();
    this.sectionColor();
  }

  renderSection() { // render handlbars
    const generatedHTML = templates.sections(this.data);
    this.element = utils.createDOMFromHTML(generatedHTML);
    const sectionContainer = document.querySelector(select.containerOf.sections);
    sectionContainer.appendChild(this.element);
  }

  getElements(){
    this.sectionHead = this.element.querySelector('.section__con_text');
  }

  initAccordion() {
    const thisSection = this;

    this.sectionHead.addEventListener('click', e => {
      e.preventDefault();
      this.element.classList.toggle(classNames.technicalCondWrapper.active);

      const sectionsActive = document.querySelectorAll(select.all.activeSections);

      sectionsActive.forEach(section => {
        if(section != thisSection.element){
          section.classList.remove(classNames.technicalCondWrapper.active);
        }
      });
    });
  }

  sectionColor(){
    const sectionId = this.id;

    if(sectionId % 2 === 0){
      this.element.style.background = '#ff9500';
    }
    else{
      this.element.style.background = '#F7A440';
    }
  }
}