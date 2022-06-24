import {showContentTimeout} from './modal';
import {createArrChildNodes} from './childNodes';

export function hidePages(selector, arr, removeClass = 0) {
        
    arr.forEach((elem, i) => {
        selector.querySelector(`.${elem}`).style.display = 'none';
    //selector.querySelector(`.${elem}`).classList.add('hide');
    if (removeClass) {
        selector.querySelector(`.${elem}`).classList.remove(removeClass);
    } else if (selector) {
        selector.querySelector(`.${elem}`).style.display = 'none';
        //modulesContentSliderTitle[i].style.cssText = 'transition: 0s all; opacity: 0.4;';
        //modulesContenSliderArrow[i].style.cssText = 'transition: 0s all; opacity: 0;';
        //cardControls[i].style.cssText = 'transition: 0s all; margin-top: 0;';
        //cardDescription[i].style.cssText = 'transition: 0s all; opacity: 0;';
    } else {
        selector.querySelector(`.${elem}`).style.display = 'none';
    }
    
    });
}

let array = [1,2,5];

function showContent(arr, number, option) {
    
    
}
console.log(showContent(array, 1, {one: 1, two: 2}));

export function showPage(selector, arr, number = 0, plusClass = 0, sliderMini = 0, title = 0, arrow = 0, sliderMiniModules = 0) {
    //selector.querySelector(`.${arr[number]}`).classList.remove('hide');
    if (plusClass) {
    selector.querySelector(`.${arr[number]}`).classList.add(plusClass);
    } else if (selector !== 'moduleapp') {
        selector.querySelector(`.${arr[number]}`).style = 'display: block';
        /*modulesContentSliderTitle[0].style.opacity = '1';
        modulesContenSliderArrow[0].style.opacity = '1';
        cardControls[0].style = 'margin-top: -5em';
        cardDescription[0].style.opacity = '1'; */
    if (sliderMini) {
        title[number].style.opacity = '1';
        arrow[number].style.opacity = '1';
        console.log(arr.number, 'show');
        selector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
    } else if (sliderMiniModules) {
        /* modulesContentSliderTitle[number].style.opacity = '1';
        modulesContenSliderArrow[number].style.opacity = '1';
        cardControls[number].style = 'margin-top: -5em';
        cardDescription[number].style.opacity = '1'; */
        selector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
        selector.querySelector(`.${arr[number + 2]}`).style = 'display: block';
    } else {
        selector.querySelector(`.${arr[number]}`).style = 'display: block';
    }
    }
}

function sliderPage({parentSelector, logoSelector, arrName, buttonNextSelector, currentSlide, selectorShowTimeout}) {

    const parent = document.querySelector(parentSelector);
    const logo = document.querySelectorAll(logoSelector);
    const buttonNext = document.querySelectorAll(buttonNextSelector);
    const slide = document.querySelectorAll(currentSlide);

    const childNodesArray = createArrChildNodes(parent);

    function clickLogo() {
        logo.forEach(elem => {
        elem.addEventListener('click', () => {
            console.log('click');
            hidePages(parent, childNodesArray);
            showPage(parent, childNodesArray, 0);
        });
        });
    }


    /* function prevOrNextSlide() {
        buttonNext.forEach((elem, i) => {
        elem.addEventListener('click', () => {
            hidePages(parent);
            showPage(parent, childNodesArray, +slide[i].textContent - 1);
        });
        });
    }
    prevOrNextSlide(); */

    function nextSlide() {
        buttonNext.forEach((elem, i) => {
        elem.addEventListener('click', () => {
            if (i === childNodesArray.length - 1) {
            hidePages(parent, childNodesArray);
            showPage(parent, childNodesArray, 0);
            } else {
            hidePages(parent, childNodesArray);
            showPage(parent, childNodesArray, +slide[i].textContent);
            console.log('ok');
            }
            showContentTimeout(selectorShowTimeout, +slide[i].textContent + 1);
            //autoNextSlides(+currentSlide[i].textContent + 1);

        });

        });

    }

  hidePages(parent, childNodesArray);
  showPage(parent, childNodesArray);
  clickLogo();
  nextSlide();

}

export default sliderPage;
