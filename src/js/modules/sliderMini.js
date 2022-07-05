import {createArrChildNodes} from './childNodes';
import {hidePages, showPage} from './sliderPages';

function prevOrNextMiniSlide({parentSelector, selectorPrev, selectorNext, sliderType = '', selectorNextPage = 0, selectorCurrentSlide = 0, selectorSlideTitle = 0, selectorSlideArrow = 0, stepI = 2, plusClass = 0}) {
  const parent = document.querySelector(parentSelector);
  const prev = document.querySelectorAll(selectorPrev);
  const next = document.querySelectorAll(selectorNext);
  const childNodesArray = createArrChildNodes(parent);

  let autoNextSlide;
  let i = 0;
  
  if (sliderType === 'miniModules') {
    const page = document.querySelectorAll(selectorNextPage);
    const currentPage = document.querySelectorAll(selectorCurrentSlide);
    page.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        autoNextSlides(+currentPage[i + 1].textContent);
      });
    });
  }

  hidePages({
    parentSelector: parent, 
    removeClass: plusClass, 
    arr: childNodesArray, 
    sliderType: sliderType,
    title: selectorSlideTitle,
    arrow: selectorSlideArrow
  });

  showPage({
    parentSelector: parent, 
    arr: childNodesArray, 
    plusClass: plusClass, 
    sliderType: sliderType,
    title: selectorSlideTitle, 
    arrow: selectorSlideArrow
  });

  prev.forEach((elem, item) => {
    prev[item].addEventListener('click', () => {
      console.log('click');
      clearInterval(autoNextSlide);

      if (i === 0) {
        i = childNodesArray.length;
      }

      i -= stepI;
      clearInterval(autoNextSlide);
      hidePages({
        parentSelector: parent, 
        removeClass: plusClass, 
        arr: childNodesArray, 
        sliderType: sliderType,
        title: selectorSlideTitle,
        arrow: selectorSlideArrow
      });

      showPage({
        parentSelector: parent, 
        arr: childNodesArray, 
        number: i,
        plusClass: plusClass, 
        sliderType: sliderType,
        title: selectorSlideTitle, 
        arrow: selectorSlideArrow
      });

    });

    next[item].addEventListener('click', () => {

      i += stepI;
      if (i === childNodesArray.length) {
        i = 0;
      }

      clearInterval(autoNextSlide);
      hidePages({
        parentSelector: parent, 
        removeClass: plusClass, 
        arr: childNodesArray, 
        sliderType: sliderType,
        title: selectorSlideTitle,
        arrow: selectorSlideArrow
      });

      showPage({
        parentSelector: parent, 
        arr: childNodesArray, 
        number: i,
        plusClass: plusClass,
        sliderType: sliderType,
        title: selectorSlideTitle, 
        arrow: selectorSlideArrow
      });
    });
  
  });
  
    function autoNextSlides(pageNumber) {
      if (pageNumber === 3) {
        autoNextSlide = setInterval(() => {
          i += 2;
          if (i === childNodesArray.length) {
            i = 0;
          }
          hidePages({
            parentSelector: parent, 
            removeClass: plusClass, 
            arr: childNodesArray, 
            sliderType: sliderType,
            title: selectorSlideTitle,
            arrow: selectorSlideArrow
          });
    
          showPage({
            parentSelector: parent, 
            arr: childNodesArray, 
            number: i,
            plusClass: plusClass, 
            sliderType: sliderType, 
            title: selectorSlideTitle, 
            arrow: selectorSlideArrow
          });
        }, 5000);
      } else {
        i = 0;
        hidePages({
          parentSelector: parent, 
          removeClass: plusClass, 
          arr: childNodesArray,
          sliderType: sliderType, 
          title: selectorSlideTitle,
          arrow: selectorSlideArrow
        });
  
        showPage({
          parentSelector: parent, 
          arr: childNodesArray, 
          number: i,
          plusClass: plusClass,
          sliderType: sliderType,
          title: selectorSlideTitle, 
          arrow: selectorSlideArrow
        });
        clearInterval(autoNextSlide);
      }
    }
  }

export default prevOrNextMiniSlide;