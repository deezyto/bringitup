
function video ({buttonPlayClass, buttonCloseModalClass, modalClass, videoId, frameId}) {
    let player;

    const button = document.querySelectorAll(buttonPlayClass);
    const modal = document.querySelector(modalClass);
    const video = document.querySelector(videoId);
    const frame = document.querySelector(frameId);
    const close = document.querySelector(buttonCloseModalClass);
    
    function createIframe(frame) {
        let script = document.createElement('script');
        script.src = "https://www.youtube.com/iframe_api";
        frame.append(script);
    }
    createIframe(frame);
    

    function onYouTubeIframeAPIReady(url) {
      player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: url,
        playerVars: {
        'autoplay': 1,
        //'playsinline': 1
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
    }

    function onPlayerStateChange(event) {
      /* if (event.data == 2) {
        try {
        player.pauseVideo();
      } catch {
      }
    } */
    } 

    function onPlayerReady(event) {
      event.target.playVideo();
      /* if (event.data == 2) {
        try {
        player.playVideo();
      } catch {
      }
    } */
      
    }
//коли нажимаю play відео відтворюється
//коли закриваю модальне вікно відео ставиться на паузу
//коли знову відтворюю і закриваю модальне вікно
//відео відтворюється а не ставиться на паузу
//потрібно в event записувати паузу відео
    function showVideo() {
        button.forEach(elem => {
          elem.addEventListener('click', (e) => {
          modal.style.display = 'flex';
          try {
            player.playVideo();
          } catch {
            onYouTubeIframeAPIReady(video.getAttribute('data-url'));
          }
        });
      });
    }

    showVideo();

    function closeModalWindow() {
        close.addEventListener('click', (e) => {
          modal.style.display = 'none';
          console.log('modal');
          try {
            player.pauseVideo();
          } catch {
          
          }
        });
    }
    
    closeModalWindow();
  }

export default video;