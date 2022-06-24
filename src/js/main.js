
import video from './modules/video';
import sliderPage from './modules/sliderPages';
import sliderMini from './modules/sliderMini';

document.addEventListener('DOMContentLoaded', () => {

  video({
    buttonPlayClass: '.play__circle', 
    buttonCloseModalClass: '.close', 
    modalClass: '.overlay', 
    videoId: '.play', 
    frameId: '#frame'
   });

  sliderPage ({
    parentSelector: ['.page', '.moduleapp'],
    logoSelector: '.sidecontrol svg',
    arrName:  'pages',
    buttonNextSelector: '.sidecontrol__controls svg',
    currentSlide: '.sidecontrol__controls-count',
    selectorShowTimeout: '.hanson'
  });

  sliderMini({
    parentSelector: '.showup__content-slider', 
    selectorPrev: '.showup__prev', 
    selectorNext: '.showup__next', 
    slideTitle: document.querySelectorAll('.card__title'),
    slideArrow: document.querySelectorAll('.card__controls-arrow'),
    sliderMini: 1
  });

  sliderMini({
    parentSelector: '.modules__content-slider', 
    selectorPrev: '.slick-prev.modules', 
    selectorNext: '.slick-next.modules', 
    slideTitle: document.querySelectorAll('.card__title'),
    slideArrow: document.querySelectorAll('.card__controls-arrow'),
    sliderMiniModules: 1
  });

  sliderMini({
    parentSelector: '.feed__slider', 
    selectorPrev: '.slick-prev.f', 
    selectorNext: '.slick-next.f',
    //slideTitle: document.querySelectorAll('.card__title'),
    //slideTitle: '.card__title',
    //slideArrow: '.card__controls-arrow'
  });

  console.log(document.querySelector('.slick-prev.f'), '.slick-prev.f');



  /* const page = document.querySelector('.page');
  const moduleapp = document.querySelector('.moduleapp');
  const nextSlideImg = document.querySelectorAll('.sidecontrol__controls svg');
  const prevNextSlideModuleapp = document.querySelectorAll('.module__info-controls svg');
  const nextCounter = document.querySelectorAll('.next__counter');
  //const showVideoImg = document.querySelectorAll('.play__circle');
  //const overlay = document.querySelector('.overlay');
  //const frameVideo = document.querySelector('#frame');
  //const videoId = document.querySelector('.play');
  const currentSlide = document.querySelectorAll('.sidecontrol__controls-count');
  const logo = document.querySelectorAll('.sidecontrol svg');
  const slider = document.querySelector('.showup__content-slider');
  const modulesContentSlider = document.querySelector('.modules__content-slider');
  const prevSlider = document.querySelector('.showup__prev');
  const nextSlider = document.querySelector('.showup__next');
  const prevModulesContentSlider = document.querySelector('.slick-prev');
  const nextModulesContentSlider = document.querySelector('.slick-next');
  //const closeModal = document.querySelector('.close');
  const miniSlideTitle = document.querySelectorAll('.card__title');
  const miniSlideArrow = document.querySelectorAll('.card__controls-arrow');

  const modulesContentSliderTitle = modulesContentSlider.querySelectorAll('.card__title');
  const modulesContenSliderArrow = modulesContentSlider.querySelectorAll('.card__controls-arrow');
  const hanson = document.querySelector('.hanson');
  const cardControls = modulesContentSlider.querySelectorAll('.card__controls');
  const cardDescription = modulesContentSlider.querySelectorAll('.card__description');
  const feedSlider = document.querySelector('.feed__slider');
  const prevFeedSlider = feedSlider.querySelector('.slick-prev');
  const nextFeedSlider = feedSlider.querySelector('.slick-next');

  const pages = [];
  const slides = [];
  const moduleContentSlides = [];
  const feedSlides = [];

  let i = 0;
  //let player;
  let autoNextSlide; */

  /* function createArrChildNodes(selector, arr) {
    console.log(selector.childNodes);
    for (let elem of selector.childNodes) {
      if (elem.nodeName === '#text' || elem.nodeName === 'BUTTON') {
        continue;
      }
      //замінимо пробіли на точки
      let replaceSpace = elem.className.replace(/ /g, '.');
      arr.push(replaceSpace);
    }
  } */

  /* function hidePages(selector, arr, removeClass = 0) {
    
    arr.forEach((elem, i) => {
      //selector.querySelector(`.${elem}`).classList.add('hide');
      if (removeClass) {
        selector.querySelector(`.${elem}`).classList.remove(removeClass);
      } else if (selector !== moduleapp) {
        selector.querySelector(`.${elem}`).style.display = 'none';
        modulesContentSliderTitle[i].style.cssText = 'transition: 0s all; opacity: 0.4;';
        modulesContenSliderArrow[i].style.cssText = 'transition: 0s all; opacity: 0;';
        cardControls[i].style.cssText = 'transition: 0s all; margin-top: 0;';
        cardDescription[i].style.cssText = 'transition: 0s all; opacity: 0;';
      } else {
        selector.querySelector(`.${elem}`).style.display = 'none';
      }
      
    });
  }

  function showPage(selector, arr, number = 0, plusClass = 0) {
    //selector.querySelector(`.${arr[number]}`).classList.remove('hide');
    if (plusClass) {
      selector.querySelector(`.${arr[number]}`).classList.add(plusClass);
    } else if (selector !== moduleapp) {
        selector.querySelector(`.${arr[number]}`).style = 'display: block';
        modulesContentSliderTitle[0].style.opacity = '1';
        modulesContenSliderArrow[0].style.opacity = '1';
        cardControls[0].style = 'margin-top: -5em';
        cardDescription[0].style.opacity = '1';
      if (selector === slider) {
        miniSlideTitle[number].style.opacity = '1';
        miniSlideArrow[number].style.opacity = '1';
        selector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
      } else if (selector === modulesContentSlider) {
        console.log('modulesContentSlider', number, modulesContentSliderTitle[0].style.opacity = '1');
        modulesContentSliderTitle[number].style.opacity = '1';
        modulesContenSliderArrow[number].style.opacity = '1';
        cardControls[number].style = 'margin-top: -5em';
        cardDescription[number].style.opacity = '1';
        selector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
        selector.querySelector(`.${arr[number + 2]}`).style = 'display: block';
      }
  } else {
    selector.querySelector(`.${arr[number]}`).style = 'display: block';
  }
  } */

  /* function clickLogo(selector, arr) {
    logo.forEach(elem => {
      elem.addEventListener('click', () => {
        hidePages(selector, arr);
        showPage(selector, arr, 0);
      });
    });
  } */


  /* function viewHanson(pageNumber) {
    hanson.style.display = 'none';
    if (pageNumber === 3) {
      setTimeout(() => {
        hanson.style.display = 'block';
      }, 3000);
    }
  } */

  /* function autoNextSlides(pageNumber) {
    
    if (pageNumber === 3) {
      autoNextSlide = setInterval(() => {
        i += 2;
        if (i === slides.length) {
          i = 0;
        }
          
        hidePages(modulesContentSlider, moduleContentSlides);
        showPage(modulesContentSlider, moduleContentSlides, i);
      }, 5000);
    } else {
      i = 0;
      hidePages(modulesContentSlider, moduleContentSlides);
      showPage(modulesContentSlider, moduleContentSlides, i);
      clearInterval(autoNextSlide);
    }
  } */

  

  

  /* function createIframe() {
    let script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    frameVideo.append(script);
  }
  createIframe(); */


  /* function nextSlide(selector, arr) {
    nextSlideImg.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        if (i === arr.length - 1) {
          hidePages(selector, arr);
          showPage(selector, arr, 0);
        } else {
          hidePages(selector, arr);
          showPage(selector, arr, +currentSlide[i].textContent);
          console.log('ok');
        }
        viewHanson(+currentSlide[i].textContent + 1);
        autoNextSlides(+currentSlide[i].textContent + 1);

      });

    });

  } */

  /* if (page) {
     createArrChildNodes(page, pages);
    hidePages(page, pages);
    showPage(page, pages);
    createArrChildNodes(slider, slides);
    hidePages(slider, slides);
    showPage(slider, slides);
    createArrChildNodes(modulesContentSlider, moduleContentSlides);
    hidePages(modulesContentSlider, moduleContentSlides);
    showPage(modulesContentSlider, moduleContentSlides);
    clickLogo(page, pages);
    nextSlide(page, pages);
    createArrChildNodes(feedSlider, feedSlides);
    hidePages(feedSlider, feedSlides, 'feed__item-active');
    showPage(feedSlider, feedSlides, 0, 'feed__item-active'); 
    prevOrNextMiniSlide(prevSlider, nextSlider, slider, slides);
    prevOrNextMiniSlide(prevModulesContentSlider, nextModulesContentSlider, modulesContentSlider, moduleContentSlides);
    prevOrNextMiniSlide(prevFeedSlider, nextFeedSlider, feedSlider, feedSlides, 1, 'feed__item-active');
  } else {
    createArrChildNodes(moduleapp, pages);
    hidePages(moduleapp, pages);
    showPage(moduleapp, pages);
    //clickLogo(moduleapp, pages);
    //nextSlide(moduleapp, pages);
    prevOrNextSlide();
  } */

});