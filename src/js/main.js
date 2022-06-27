
import video from './modules/video';
import sliderPage from './modules/sliderPages';
import sliderMini from './modules/sliderMini';
import showContent from './modules/content';

document.addEventListener('DOMContentLoaded', () => {

  video({
    classVideo: '.module__video-item',
    buttonPlayClass: '.play__circle', 
    buttonCloseModalClass: '.close', 
    modalClass: '.overlay', 
    classVideoIdAttribute: '.play', 
    attributeVideoId: 'data-url',
    frameId: 'frame',
    videoPlayText: '.play__text',
    videoBlockAttribute: 'data-videoBlock',
    blockVideoMode: 'low'
   });


  try {
  sliderPage ({
    parentSelector: '.page',
    logoSelector: '.sidecontrol a',
    buttonNextSelector: '.sidecontrol__controls a',
    currentSlide: '.sidecontrol__controls-count',
    selectorShowTimeout: '.hanson'
  });
  } catch {

  }

  try {
  sliderPage ({
    parentSelector: '.moduleapp',
    logoSelector: '.sidecontrol a',
    buttonNextSelector: '.sidecontrol__controls a',
    currentSlide: '.sidecontrol__controls-count',
  });
  } catch {

    
  }

  try {
  sliderMini({
    parentSelector: '.showup__content-slider', 
    selectorPrev: '.showup__prev', 
    selectorNext: '.showup__next', 
    slideTitle: '.card__title',
    slideArrow: '.card__controls-arrow',
    sliderMini: 1
  });
   }
  catch {

  }

  try {

  
  sliderMini({
    parentSelector: '.modules__content-slider', 
    selectorPrev: '.slick-prev.modules', 
    selectorNext: '.slick-next.modules', 
    slideTitle: '.card__title',
    slideArrow: '.card__controls-arrow',
    sliderMiniModules: 1,
    currentSlide: '.sidecontrol__controls-count'
  });
  } catch {

  }

  try {

  sliderMini({
    parentSelector: '.feed__slider', 
    selectorPrev: '.slick-prev.f', 
    selectorNext: '.slick-next.f',
    sliderFeed: 1,
    stepI: 1,
    plusClass: 'feed__item-active'
  });
  } catch {

  }

  try {
  sliderMini({
    parentSelector: '.moduleapp', 
    selectorPrev: '.prevmodule', 
    selectorNext: '.nextmodule',
    stepI: 1
  });
  } catch {
  }

  try {
    showContent({
      parentSelector: '.difference__info-cards',
      button: '.plus'
    });
    } catch (e) {
      console.log(e, 'showContent');
    }
});