import {createArrChildNodes} from './childNodes';

function getLink(link = 0) {
  const linkList = {
    bitmap: {
      name: 'bitmap',
      link: '/test/assets/img/Bitmap.jpg'
    },
    one: {
      name: 'one',
      link: '/test/assets/img/feed_1.png'
    },
    two: {
      name: 'two',
      link: '/test/assets/img/feed_2.png'
    },
    three: {
      name: 'three',
      link: '/test/assets/img/main_light.jpg'
    },
    four: {
      name: 'four',
      link: '/test/assets/img/module_bg.jpg'
    },
    five: {
      name: 'five',
      link: '/test/assets/img/showup.jpg'
    },
    computer: {
      name: 'computer',
      link: '/test/assets/img/slide_1_m.jpg'
    },
    site: {
      name: 'site',
      link: '/test/assets/img/talk_bg.jpg'
    }
  };

  const elem = document.createElement('a');
  elem.setAttribute('href', linkList[link].link);
  elem.setAttribute('download', linkList[link].name);

  elem.style.display = 'none';
  document.body.appendChild(elem);

  elem.click();

  document.body.removeChild(elem);
}

function download() {
  
  const button = document.querySelectorAll('.download');
  const link = document.querySelectorAll('[data-link]');

  button.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      getLink(link[i].getAttribute('data-link'));
    });
  });

}

download();



//при натисканні на кнопку показуються із затримкою всі пункти які мають display: none
//а кнопка на яку натискали після показа останнього отримує display: none
function hideShow(parentSelector, hideOrShow = '') {
  const parent = document.querySelector(`.${parentSelector}`);
  const childNodesArray = createArrChildNodes(parent);

  let display;

  if (hideOrShow) {
    display = 'flex';
  } else {
    display = 'none';
  }
  
    childNodesArray.forEach((elem, i) => {
        setTimeout(() => {
          if (i > 0 && i !== childNodesArray.length - 1) {
            parent.querySelectorAll(`.${elem}`)[i - 1].style = `animation: fadeIn 1s; display: ${display}`;
            parent.querySelectorAll(`.${elem}`)[i - 1].style = `animation: none; display: ${display}`;
          }
          if (hideOrShow && i === childNodesArray.length - 1) {
            parent.querySelectorAll(`.${elem}`)[i - 1].style = `animation: none; display: none`;
          }
        }, hideOrShow && i > 1 ? 1000 * i : 5);
        
      });
  
}

function showContent({parentSelector, button}) {
  const parent = document.querySelector(parentSelector);
  const childNodesArray = createArrChildNodes(parent);
  childNodesArray.forEach((elem, i) => {
    hideShow(elem);
    document.querySelector(`.${elem}`).querySelector(button).addEventListener('click', () => {
      console.log('show');
      hideShow(elem, 'show');
    });
  });
  console.log(childNodesArray, 'content');
}

export default showContent;