import {createArrChildNodes} from './childNodes';
import {animationShowHide} from './animation';

//shows or hides content after clicking a button with an animation effect
function showHideContent({parentSelector, selectorShowContent, selectorActive, heightShowContent = 0}) {
  const parent = document.querySelector(parentSelector);
  const childNodesArray = createArrChildNodes(parent);

  childNodesArray.forEach((elem, i) => {
    document.querySelector(`.${elem}`).querySelector('.plus').addEventListener('click', () => {
      const showContent = document.querySelectorAll(selectorShowContent)[i];
      const active = document.querySelector(`.${elem}`).querySelector(selectorActive);
      if (!active) {
        animationShowHide(showContent, 'show', heightShowContent);
        document.querySelectorAll('.msg')[i].classList.add('msg__show');
      } else {
        animationShowHide(showContent, 'hide', heightShowContent);
        document.querySelectorAll('.msg')[i].classList.remove('msg__show');
        
      }
    });
  });
}

export default showHideContent;