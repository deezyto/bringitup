export function showHide(selector, plusMinus = 'plus', number = 0) {
    let animation;
    if (plusMinus === 'minus') {
      for (let i = number; i > 0; i--) {
        selector.style.height = i + 'px';
        animation = requestAnimationFrame(showHide);
      }

    } else {
      for (let i = 0; i < number; i++) {
        selector.style.height = i + 'px';
        animation = requestAnimationFrame(showHide);
      }
    }

}

export default showHide;