
function video ({classVideo, 
  buttonPlayClass, buttonCloseModalClass, modalClass, classVideoIdAttribute, attributeVideoId, 
  frameId, videoPlayText, videoBlockAttribute = 'videoBlockAttribute', blockVideoMode = 'low'}) {

  let player;
  let videoNumber = 0;
  
  const video = document.querySelectorAll(classVideo);
  const button = document.querySelectorAll(buttonPlayClass);
  const modal = document.querySelector(modalClass);
  const videoAttribute = document.querySelectorAll(classVideoIdAttribute);
  const close = document.querySelector(buttonCloseModalClass);
  const playText = document.querySelectorAll(videoPlayText);
  
  function createIframe() {
    let script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.querySelectorAll('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
  }
  createIframe();
  

  function onYouTubeIframeAPIReady(videoId) {
    player = new YT.Player(frameId, {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
      'autoplay': 1
      },
      events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
      }
  });
  }

  function setVideoViewHistoryInLocalStorage(videoId, videoNumber = 0, set = 0) {
    const getVideo = localStorage.getItem(videoId);
    if (!getVideo && set) {
      localStorage.setItem(videoId, 'unlock');
      setStyleAfterUnlockVideo(videoNumber);
    } else if (getVideo) {
      setStyleAfterUnlockVideo(videoNumber);
    }
  }

  function setVideoBlockAttribute() {
    button.forEach((elem, i) => {
      if (i % 2 !== 0) {
        video[i].setAttribute(videoBlockAttribute, 'true');
      }
    });
  }

  setVideoBlockAttribute();

  function updateVideoStileForVideoViewHostory() {
    for (let i = 0; i < button.length - 1; i++) {
      setVideoViewHistoryInLocalStorage(videoAttribute[i + 1].getAttribute(attributeVideoId), i);
    }
  }

  updateVideoStileForVideoViewHostory();

  function setStyleAfterUnlockVideo(videoNumber = 0) {
    const moduleVideo = video[videoNumber + 1];
    const playButtonImg = button[videoNumber].querySelector('svg').cloneNode(true);
    
    moduleVideo.style = 'filter: none; opacity: 1;';
    playText[videoNumber + 1].textContent = playText[videoNumber].textContent;
    playText[videoNumber + 1].classList.remove('attention');
    button[videoNumber + 1].querySelector('svg').remove();
    button[videoNumber + 1].appendChild(playButtonImg);
    moduleVideo.setAttribute(videoBlockAttribute, 'false');

  }

  function onPlayerStateChange(event) {
    if (event.data !== -1) {
      showVideo();
    }

    if (event.data === 0) {
      if (blockVideoMode === 'hight' && player.getCurrentTime() === (player.getDuration() - (player.getDuration() * 0.1))) {
        setVideoViewHistoryInLocalStorage(videoAttribute[videoNumber + 1].getAttribute(attributeVideoId), videoNumber, 1);

      } else if (blockVideoMode === 'low') {
        setVideoViewHistoryInLocalStorage(videoAttribute[videoNumber + 1].getAttribute(attributeVideoId), videoNumber, 1);
      }

    }
    
  } 
  
  function onPlayerReady(event) {

  }

  function showVideo() {
    let firstVideo = '';
    let nextVideo = '';
    
    button.forEach((elem, i) => {
        
      elem.addEventListener('click', (e) => {

        if (!video[i].getAttribute(videoBlockAttribute) || video[i].getAttribute(videoBlockAttribute) === 'false') {
    
        modal.style.display = 'flex';
        firstVideo = videoAttribute[i].getAttribute(attributeVideoId);

        if (!player) {
          videoNumber = i;
          onYouTubeIframeAPIReady(firstVideo);
        }
        
        if (firstVideo && nextVideo && firstVideo === nextVideo) {

          try {
            player.playVideo();
          } catch {

          }
        } else if (!nextVideo) {
          videoNumber = i;
          nextVideo = videoAttribute[i].getAttribute(attributeVideoId);
        } else if (firstVideo !== nextVideo && firstVideo && nextVideo) {

          try {
            videoNumber = i;
            player.loadVideoById({videoId: firstVideo});
          } catch {
            player.stopVideo();
          }
          firstVideo = '';
          nextVideo = '';
          
        }
      }
    });
      
  });
  }

  showVideo();

  function closeModalWindow() {
      close.addEventListener('click', (e) => {
        modal.style.display = 'none';
        try {
          player.pauseVideo();
        } catch {
        
        }
      });
  }
  
  closeModalWindow();
}

export default video;