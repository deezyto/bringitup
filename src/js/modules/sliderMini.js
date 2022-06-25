import {createArrChildNodes} from './childNodes';
import {hidePages, showPage} from './sliderPages';
import {showHide} from './animation';

let autoNextSlide;

function prevOrNextMiniSlide({parentSelector, selectorPrev, selectorNext, currentSlide = 0, slideTitle = 0, slideArrow = 0, sliderMini = 0, stepI = 2, plusClass = 0, sliderMiniModules = 0, sliderFeed = 0}) {
  const parent = document.querySelector(parentSelector);
  const prev = document.querySelectorAll(selectorPrev);
  const next = document.querySelectorAll(selectorNext);

  const childNodesArray = createArrChildNodes(parent);

  let i = 0;

  if (sliderMiniModules) {
    const slide = document.querySelectorAll(currentSlide);
    slide.forEach((elem, i) => {
      document.querySelectorAll('.sidecontrol__controls')[i].addEventListener('click', () => {
        autoNextSlides(+slide[i + 1].textContent);
      });
    });
  }

  hidePages({
    parentSelector: parent, 
    removeClass: plusClass, 
    arr: childNodesArray, 
    title: slideTitle,
    arrow: slideArrow,
    sliderMini: sliderMini,
    sliderMiniModules: sliderMiniModules,
    sliderFeed: sliderFeed
  });

  showPage({
    parentSelector: parent, 
    arr: childNodesArray, 
    plusClass: plusClass, 
    sliderMini: sliderMini, 
    title: slideTitle, 
    arrow: slideArrow, 
    sliderMiniModules: sliderMiniModules,
    sliderFeed: sliderFeed
  });

  console.log(sliderMiniModules, 'sliderMiniModules1')

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
        title: slideTitle,
        arrow: slideArrow,
        sliderMini: sliderMini,
        sliderMiniModules: sliderMiniModules,
        sliderFeed: sliderFeed
      });

      showPage({
        parentSelector: parent, 
        arr: childNodesArray, 
        number: i,
        plusClass: plusClass, 
        sliderMini: sliderMini, 
        title: slideTitle, 
        arrow: slideArrow, 
        sliderMiniModules: sliderMiniModules,
        sliderFeed: sliderFeed
      });

    });

    next[item].addEventListener('click', () => {
      console.log('click');

      i += stepI;
      if (i === childNodesArray.length) {
        i = 0;
      }

      clearInterval(autoNextSlide);
      hidePages({
        parentSelector: parent, 
        removeClass: plusClass, 
        arr: childNodesArray, 
        title: slideTitle,
        arrow: slideArrow,
        sliderMini: sliderMini,
        sliderMiniModules: sliderMiniModules,
        sliderFeed: sliderFeed
      });

      showPage({
        parentSelector: parent, 
        arr: childNodesArray, 
        number: i,
        plusClass: plusClass, 
        sliderMini: sliderMini, 
        title: slideTitle, 
        arrow: slideArrow, 
        sliderMiniModules: sliderMiniModules,
        sliderFeed: sliderFeed
      });
    });
  
  });

  function showHideContent() {
    childNodesArray.forEach((elem, i) => {
      document.querySelector(`.${elem}`).querySelector('.plus').addEventListener('click', () => {
            let test = document.querySelector(`.${elem}`).querySelector('.msg__show');
            let test1 = document.querySelectorAll('.msg')[i];
            if (!test) {
              showHide(test1, 'plus', 100);
              document.querySelectorAll('.msg')[i].classList.add('msg__show');
            } else {
              showHide(test1, 'minus', 100);
              document.querySelectorAll('.msg')[i].classList.remove('msg__show');
              
            }
          });
    });
  }

  showHideContent();
  
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
            title: slideTitle,
            arrow: slideArrow,
            sliderMini: sliderMini,
            sliderMiniModules: sliderMiniModules,
            sliderFeed: sliderFeed
          });
    
          showPage({
            parentSelector: parent, 
            arr: childNodesArray, 
            number: i,
            plusClass: plusClass, 
            sliderMini: sliderMini, 
            title: slideTitle, 
            arrow: slideArrow, 
            sliderMiniModules: sliderMiniModules,
            sliderFeed: sliderFeed
          });
        }, 5000);
      } else {
        i = 0;
        hidePages({
          parentSelector: parent, 
          removeClass: plusClass, 
          arr: childNodesArray, 
          title: slideTitle,
          arrow: slideArrow,
          sliderMini: sliderMini,
          sliderMiniModules: sliderMiniModules,
          sliderFeed: sliderFeed
        });
  
        showPage({
          parentSelector: parent, 
          arr: childNodesArray, 
          number: i,
          plusClass: plusClass, 
          sliderMini: sliderMini, 
          title: slideTitle, 
          arrow: slideArrow, 
          sliderMiniModules: sliderMiniModules,
          sliderFeed: sliderFeed
        });
        clearInterval(autoNextSlide);
      }
    }

  }

export default prevOrNextMiniSlide;