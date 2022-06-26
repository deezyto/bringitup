import {createArrChildNodes} from './childNodes';

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