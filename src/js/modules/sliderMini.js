import { createArrChildNodes } from './childNodes';
import {hidePages, showPage} from './sliderPages';

let autoNextSlide;

function prevOrNextMiniSlide({parentSelector, selectorPrev, selectorNext, slideTitle = 0, slideArrow = 0, description = 0, sliderMini = 0, stepI = 2, removeClass = 0, sliderMiniModules = 0}) {
  const parent = document.querySelector(parentSelector);
  const prev = document.querySelector(selectorPrev);
  const next = document.querySelector(selectorNext);
  //const title = document.querySelectorAll(slideTitle);
  //const arrow = document.querySelectorAll(slideArrow);

  const childNodesArray = createArrChildNodes(parent);
  let i = 0;
  console.log(parent);
  hidePages(parent, childNodesArray);
  showPage(parent, childNodesArray, removeClass, 0, sliderMini, slideTitle, slideArrow, sliderMiniModules);

    prev.addEventListener('click', () => {
      console.log('click');
      clearInterval(autoNextSlide);

      if (i === 0) {
        i = childNodesArray.length;
      }

      i -= stepI;
      clearInterval(autoNextSlide);
      hidePages(parent, childNodesArray, removeClass);
      showPage(parent, childNodesArray, i, removeClass, sliderMini, slideTitle, slideArrow, sliderMiniModules);
    });

    next.addEventListener('click', () => {
      console.log('click');

      i += stepI;
      if (i === childNodesArray.length) {
        i = 0;
      }

      clearInterval(autoNextSlide);
      hidePages(parent, childNodesArray, removeClass);
      showPage(parent, childNodesArray, i, removeClass, sliderMini, slideTitle, slideArrow, sliderMiniModules);
    });
  
    function autoNextSlides(pageNumber) {
    
      if (pageNumber === 3) {
        autoNextSlide = setInterval(() => {
          i += 2;
          if (i === childNodesArray.length) {
            i = 0;
          }
          //hidePages(modulesContentSlider, moduleContentSlides);
          //showPage(modulesContentSlider, moduleContentSlides, i);
        }, 5000);
      } else {
        i = 0;
        //hidePages(modulesContentSlider, moduleContentSlides);
        //showPage(modulesContentSlider, moduleContentSlides, i);
        clearInterval(autoNextSlide);
      }
    }
  }

export default prevOrNextMiniSlide;