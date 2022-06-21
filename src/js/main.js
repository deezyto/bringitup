
document.addEventListener('DOMContentLoaded', () => {

  const page = document.querySelector('.page');
  const moduleapp = document.querySelector('.moduleapp');
  const nextSlideImg = document.querySelectorAll('.sidecontrol__controls svg');
  const prevNextSlideModuleapp = document.querySelectorAll('.module__info-controls svg');
  const nextCounter = document.querySelectorAll('.next__counter');
  const showVideoImg = document.querySelectorAll('.play__circle');
  const overlay = document.querySelector('.overlay');
  const frameVideo = document.querySelector('#frame');
  const currentSlide = document.querySelectorAll('.sidecontrol__controls-count');
  const logo = document.querySelectorAll('.sidecontrol svg');
  const slides = [];
  let player;

  function createArrChildNodes(selector) {
    for (let elem of selector.childNodes) {
      if (elem.nodeName === '#text') {
        continue;
      }
      slides.push(elem.className);
    }
  }

  function hidePages(selector) {
    slides.forEach(elem => {
      selector.querySelector(`.${elem}`).classList.add('hide');
    });
  }

  function showPage(selector, number=0) {
    selector.querySelector(`.${slides[number]}`).classList.remove('hide');
  }

  function clickLogo(selector) {
    logo.forEach(elem => {
      elem.addEventListener('click', () => {
        hidePages(selector);
        showPage(selector, 0);
      });
    });
  }

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

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: 'M7lc1UVf-VE',
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
        onYouTubeIframeAPIReady();
      });
    });
  }
  showVideo();

  function nextSlide(selector) {
    nextSlideImg.forEach((elem, i) => {
      elem.addEventListener('click', () => {

        if (i === slides.length - 1) {
          hidePages(selector);
          showPage(selector, 0);
        } else {
          hidePages(selector);
          showPage(selector, +currentSlide[i].textContent);
          console.log('ok');
        }

      });

    });

    }

  if (page) {
    createArrChildNodes(page);
    hidePages(page);
    showPage(page);
    clickLogo(page);
    nextSlide(page);
  } else {
    createArrChildNodes(moduleapp);
    hidePages(moduleapp);
    showPage(moduleapp);
    clickLogo(moduleapp);
    nextSlide(moduleapp);
    prevOrNextSlide();
  }

});