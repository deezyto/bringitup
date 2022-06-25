
function video ({buttonPlayClass, buttonCloseModalClass, modalClass, videoId, frameId}) {
    let player;

    const button = document.querySelectorAll(buttonPlayClass);
    const modal = document.querySelector(modalClass);
    const video = document.querySelectorAll(videoId);
    const frame = document.querySelector(frameId);
    const close = document.querySelector(buttonCloseModalClass);
    
    function createIframe(frame) {
        let script = document.createElement('script');
        script.src = "https://www.youtube.com/iframe_api";
        frame.append(script);
    }
    createIframe(frame);
    
    function onYouTubeIframeAPIReady(videoId) {
      player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: videoId,
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
//якщо клікнули на кнопку ту саму то відтворити відео
//якщо на інакшу то видалити попереднє і відтворити нове
let firstVideo = '';
let nextVideo = '';
    function showVideo() {
      
        button.forEach((elem, i) => {
          elem.addEventListener('click', (e) => {
            console.log(elem, i);
          
          modal.style.display = 'flex';
          console.log(video[i].getAttribute('data-url'));
          nextVideo = video[i].getAttribute('data-url');
          if (firstVideo && nextVideo && firstVideo === nextVideo) {
            player.playVideo();
            console.log(firstVideo, nextVideo, 'if');
          } else if (!firstVideo) {
            firstVideo = video[i].getAttribute('data-url');
            onYouTubeIframeAPIReady(firstVideo);
            console.log(firstVideo, nextVideo, 'else if');
          } else if (firstVideo !== nextVideo) {
            firstVideo = nextVideo;
            onYouTubeIframeAPIReady(nextVideo);
            nextVideo = '';
            console.log(firstVideo, nextVideo, 'else if 1');
          }
          

          try {
            //player.playVideo();
            

          } catch {
            //onYouTubeIframeAPIReady(video[i].getAttribute('data-url'));
            
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