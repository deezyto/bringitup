
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
        button.forEach(elem => {
        elem.addEventListener('click', (e) => {
        modal.style.display = 'flex';
        onYouTubeIframeAPIReady(video.getAttribute('data-url'));
        });
    });
    }
    showVideo();

    function closeModalWindow() {
        close.addEventListener('click', () => {

          try {
            player.stopVideo();
          } catch (e) {
            console.log(e);
          }
          modal.style.display = 'none';
        });
      }
    
    closeModalWindow();
}

export default video;