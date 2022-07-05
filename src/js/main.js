
import video from './modules/video';
import sliderPage from './modules/sliderPages';
import sliderMini from './modules/sliderMini';
import showElementsGradually from './modules/showElementsGradually';
import sendForm from './services/forms';
import download from './modules/getHideLinkForFile';
import showHideContent from './modules/showHideContent';

document.addEventListener('DOMContentLoaded', () => {

  video({
    classVideo: ['.module__video-item', '.showup__video'],
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
    sliderType: 'mini',
    selectorSlideTitle: '.card__title',
    selectorSlideArrow: '.card__controls-arrow'
  });
  } catch {

  }

  try {
  sliderMini({
    parentSelector: '.modules__content-slider', 
    selectorPrev: '.slick-prev.modules', 
    selectorNext: '.slick-next.modules', 
    sliderType: 'miniModules',
    selectorSlideTitle: '.card__title',
    selectorSlideArrow: '.card__controls-arrow',
    selectorNextPage: '.sidecontrol__controls a',
    selectorCurrentSlide: '.sidecontrol__controls-count'
  });
  } catch {

  }

  try {
  sliderMini({
    parentSelector: '.feed__slider', 
    selectorPrev: '.slick-prev.f', 
    selectorNext: '.slick-next.f',
    sliderType: 'feed',
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
    showElementsGradually({
      parentSelector: '.difference__info-cards',
      selectorButton: '.plus'
    });
    } catch (e) {
      console.log(e, 'showContent');
    }

  try {
    sendForm({
      formInputs: ['input', 'select'],
      parentNode: 2,
      style: 1
    });
  } catch {

  }

  try {
    sendForm({
      formId: 1,
      parentNode: 2,
      style: 2
    });
  } catch {

  }
  
  try {
    download({
      selectorButton: '.download',
      attributeLink: 'data-link'
    });
  } catch {

  }

  try {
    showHideContent({
      parentSelector: '.moduleapp',
      selectorShowContent: '.msg',
      selectorActive: '.msg__show',
      heightShowContent: 100
    });
  } catch {

  }

  
});