
document.addEventListener('DOMContentLoaded', () => {

  const page = document.querySelector('.page');
  const moduleapp = document.querySelector('.moduleapp');
  const nextSlideImg = document.querySelectorAll('.sidecontrol__controls svg');
  const prevNextSlideModuleapp = document.querySelectorAll('.module__info-controls svg');
  const nextCounter = document.querySelectorAll('.next__counter');
  const showVideoImg = document.querySelectorAll('.play__circle');
  const overlay = document.querySelector('.overlay');
  const frameVideo = document.querySelector('#frame');
  const videoId = document.querySelector('.play');
  const currentSlide = document.querySelectorAll('.sidecontrol__controls-count');
  const logo = document.querySelectorAll('.sidecontrol svg');
  const slider = document.querySelector('.showup__content-slider');
  const modulesContentSlider = document.querySelector('.modules__content-slider');
  const prevSlider = document.querySelector('.showup__prev');
  const nextSlider = document.querySelector('.showup__next');
  const prevModulesContentSlider = document.querySelector('.slick-prev');
  const nextModulesContentSlider = document.querySelector('.slick-next');
  const closeModal = document.querySelector('.close');
  const miniSlideTitle = document.querySelectorAll('.card__title');
  const miniSlideArrow = document.querySelectorAll('.card__controls-arrow');
  const modulesContentSliderTitle = modulesContentSlider.querySelectorAll('.card__title');
  const modulesContenSliderArrow = modulesContentSlider.querySelectorAll('.card__controls-arrow');
  const hanson = document.querySelector('.hanson');

  slider.style.cssText = `display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: flex-start;`;

  modulesContentSlider.style.cssText = `display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: flex-start;
  `;

  const pages = [];
  const slides = [];

  let player;

  function createArrChildNodes(selector, arr) {
    for (let elem of selector.childNodes) {
      if (elem.nodeName === '#text') {
        continue;
      }
      //замінимо пробіли на точки
      let replaceSpace = elem.className.replace(/ /g, '.');
      arr.push(replaceSpace);
    }
  }

  function hidePages(selector, arr) {
    arr.forEach(elem => {
      //selector.querySelector(`.${elem}`).classList.add('hide');
      selector.querySelector(`.${elem}`).style.display = 'none';
    });
  }

  function showPage(selector, arr, number=0) {
    //selector.querySelector(`.${arr[number]}`).classList.remove('hide');
    selector.querySelector(`.${arr[number]}`).style = 'display: block';
    if (selector === slider) {
      miniSlideTitle[number].style.opacity = '1';
      miniSlideArrow[number].style.opacity = '1';
      selector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
    } else if (selector === modulesContentSlider) {
      console.log('ok');
      modulesContentSliderTitle[number].style.opacity = '1';
      modulesContenSliderArrow[number].style.opacity = '1';
      selector.querySelector(`.${arr[number + 1]}`).style = 'display: block';
      selector.querySelector(`.${arr[number + 2]}`).style = 'display: block';
    }
    viewHanson(number);
  }

  function clickLogo(selector, arr) {
    logo.forEach(elem => {
      elem.addEventListener('click', () => {
        hidePages(selector, arr);
        showPage(selector, arr, 0);
      });
    });
  }

  function closeModalWindow() {
    closeModal.addEventListener('click', () => {
      //stopVideo();
      try {
        player.stopVideo();
      } catch (e) {
        console.log(e);
      }
      overlay.style.display = 'none';
    });
  }

  function viewHanson(number) {
    let i = 0;
    hanson.style.display = 'none';
    if (number === 2 && i < 1) {
      setTimeout(() => {
        hanson.style.display = 'block';
      }, 3000);
      i++;
    }
  }


  function prevOrNextMiniSlide(SelectorPrev, SelectorNext, slider, slides) {
    let i = 0;
    SelectorPrev.addEventListener('click', () => {
      console.log('click');
      //console.log(currentMiniSlide.textContent);
      if (i === 0) {
        i = slides.length;
      }

      i -= 2;
      hidePages(slider, slides);
      showPage(slider, slides, i);
    });

    SelectorNext.addEventListener('click', () => {
      console.log('click');
      //console.log(currentMiniSlide.textContent);
      i += 2;
      if (i === slides.length) {
        i = 0;
      }
      
      hidePages(slider, slides);
      showPage(slider, slides, i);
    });
  }
  prevOrNextMiniSlide(prevSlider, nextSlider, slider, slides);
  prevOrNextMiniSlide(prevModulesContentSlider, nextModulesContentSlider, modulesContentSlider, slides);

  function prevOrNextSlide() {
    prevNextSlideModuleapp.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        hidePages(moduleapp);
        showPage(moduleapp, +nextCounter[i].textContent - 1);
      });
    });
  }

  function createIframe() {
    let script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    frameVideo.append(script);
  }
  createIframe();

  function onYouTubeIframeAPIReady(url) {
    player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: url,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
      }
    });
  }
  
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function showVideo() {
    showVideoImg.forEach(elem => {
      elem.addEventListener('click', (e) => {
        overlay.style.display = 'flex';
        onYouTubeIframeAPIReady(videoId.getAttribute('data-url'));
      });
    });
  }
  showVideo();
  closeModalWindow();

  function nextSlide(selector, arr) {
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

      });

    });

    }

  if (page) {
    createArrChildNodes(page, pages);
    hidePages(page, pages);
    showPage(page, pages);
    createArrChildNodes(slider, slides);
    hidePages(slider, slides);
    showPage(slider, slides);
    clickLogo(page, pages);
    nextSlide(page, pages);
  } else {
    createArrChildNodes(moduleapp);
    hidePages(moduleapp);
    showPage(moduleapp);
    clickLogo(moduleapp);
    nextSlide(moduleapp);
    prevOrNextSlide();
  }

  //showPage(slider, slides);
  //slider.style.transform = `translateX(500px)`;


  console.log(slider.childNodes);
});