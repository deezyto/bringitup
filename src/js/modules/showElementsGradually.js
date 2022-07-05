import {createArrChildNodes} from './childNodes';

//when clicking on the button, all items with display: none are displayed gradually with a delay
//after showing the last item, the button that was clicked - receives display: none
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

function showElementsGradually({parentSelector, selectorButton}) {
  const parent = document.querySelector(parentSelector);
  const childNodesArray = createArrChildNodes(parent);
  childNodesArray.forEach((elem, i) => {
    hideShow(elem);
    document.querySelector(`.${elem}`).querySelector(selectorButton).addEventListener('click', () => {
      console.log('show');
      hideShow(elem, 'show');
    });
  });
  console.log(childNodesArray, 'content');
}

export default showElementsGradually;