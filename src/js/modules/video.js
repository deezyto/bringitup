
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
        let firstScriptTag = document.querySelectorAll('script')[0];
        firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

        //frame.append(script);
        //script.src = "https://www.youtube.com/iframe_api";
        //let firstScriptTag = document.getElementsByTagName('script')[0];
        //firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    }
    createIframe(frame);
    

    function onYouTubeIframeAPIReady(videoId) {
      player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
        'autoplay': 1
        //'playsinline': 1
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
    }
    
    

    function onPlayerStateChange(event) {
      showVideo();
    } 
    

    function onPlayerReady(event) {

      /* try {
        player.playVideo();
      } catch {
        
      } */

    }


//якщо клікнули на кнопку ту саму то відтворити відео
//якщо на інакшу то видалити попереднє і відтворити нове

    function showVideo() {
      let firstVideo = '';
      let nextVideo = '';
      
        button.forEach((elem, i) => {
          elem.addEventListener('click', () => {
          
          modal.style.display = 'flex';
          firstVideo = video[i].getAttribute('data-url');
          console.log(player);
          if (!player) {
            onYouTubeIframeAPIReady(firstVideo);
          }
          
          if (firstVideo && nextVideo && firstVideo === nextVideo) {

            try {
              player.playVideo();
            } catch {

            }
          } else if (!nextVideo) {
            nextVideo = video[i].getAttribute('data-url');
          } else if (firstVideo !== nextVideo && firstVideo && nextVideo) {
            
            try {
              player.loadVideoById({videoId: firstVideo});
            } catch {
              
            }
            firstVideo = '';
            nextVideo = '';
            
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