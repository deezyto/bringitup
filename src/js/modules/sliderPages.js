import {showContentTimeout} from './modal';
import {createArrChildNodes} from './childNodes';

export function hidePages({parentSelector, arr, title = 0, arrow = 0, removeClass = 0, sliderMini = 0, sliderMiniModules = 0, sliderFeed = 0}) {
        
    arr.forEach((elem, i) => {
        if (removeClass) {
            parentSelector.querySelector(`.${elem}`).classList.remove(removeClass);
        } else if (sliderMini) {
            parentSelector.querySelector(`.${elem}`).style.display = 'none';
        } else if (sliderMiniModules) {

            parentSelector.querySelector(`.${elem}`).style.display = 'none';
            parentSelector.querySelectorAll(title)[i].style = 'transition: 0s all; opacity: 0.4';
            parentSelector.querySelectorAll(arrow)[i].style.opacity = '0';
            parentSelector.querySelectorAll('.card__controls')[i].style = 'transition: 0s all; margin-top: 0';
            parentSelector.querySelectorAll('.card__description')[i].style = 'transition: 0s all; opacity: 0';
        } else if (sliderFeed) {
            //parentSelector.querySelector(`.${elem}`).style.display = 'none';
        } else {
            parentSelector.querySelector(`.${elem}`).style.display = 'none';
        }
   
    });
}

export function showPage({parentSelector, arr, number = 0, plusClass = 0, sliderMini = 0, sliderMiniModules = 0, sliderFeed = 0, title = 0, arrow = 0}) {

    if (plusClass) {
        document.querySelector(`.${arr[number]}`).classList.add(plusClass);
    } else if (sliderMini) {
        document.querySelectorAll(title)[number].style.opacity = '1';
        document.querySelectorAll(arrow)[number].style.opacity = '1';

        parentSelector.querySelector(`.${arr[number]}`).style = 'display: block';
        parentSelector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
        
    } else if (sliderMiniModules) {
        parentSelector.querySelectorAll(title)[number].style = 'transition: .5s all; opacity: 1';
        parentSelector.querySelectorAll(arrow)[number].style.opacity = '1';
        parentSelector.querySelectorAll('.card__controls')[number].style = 'transition: .5s all; margin-top: -5em';
        parentSelector.querySelectorAll('.card__description')[number].style = 'transition: .5s all; opacity: 1';

        parentSelector.querySelector(`.${arr[number]}`).style = 'display: block';
        parentSelector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
        parentSelector.querySelector(`.${arr[number + 2]}`).style = 'display: block';
    } else if (sliderFeed) {
        //parentSelector.querySelector(`.${arr[number]}`).style = 'display: block';
    } else {
        //parentSelector.querySelector(`.${arr[number]}`).style = 'display: block';
        parentSelector.querySelector(`.${arr[number]}`).style = 'display: block';
    }
}

function sliderPage({parentSelector, logoSelector, buttonNextSelector, currentSlide, selectorShowTimeout = 0}) {

    const parent = document.querySelector(parentSelector);
    const logo = document.querySelectorAll(logoSelector);
    const buttonNext = document.querySelectorAll(buttonNextSelector);
    const slide = document.querySelectorAll(currentSlide);

    const childNodesArray = createArrChildNodes(parent);

    function clickLogo() {
        logo.forEach(elem => {
        elem.addEventListener('click', () => {
            console.log('click');
            hidePages({parentSelector: parent, arr: childNodesArray});
            showPage({parentSelector: parent, arr: childNodesArray});
        });
        });
    }


    function nextSlide() {
        buttonNext.forEach((elem, i) => {
        elem.addEventListener('click', () => {
            if (i === childNodesArray.length - 1) {
            hidePages({parentSelector: parent, arr: childNodesArray});
            showPage({parentSelector: parent, arr: childNodesArray});
            } else {
            hidePages({parentSelector: parent, arr: childNodesArray});
            showPage({parentSelector: parent, arr: childNodesArray, number: +slide[i].textContent});

            console.log('ok');
            }
            if (selectorShowTimeout) {
                showContentTimeout(selectorShowTimeout, +slide[i].textContent + 1);
            }

        });

        });

    }

  hidePages({parentSelector: parent, arr: childNodesArray});
  showPage({parentSelector: parent, arr: childNodesArray});
  clickLogo();
  nextSlide();

  

}

export default sliderPage;