
export function animationShowHide(selectorForAnimation, showHide = 'hide', heightShowContent = 50) {
    let animation;
    if (showHide === 'hide') {
      for (let i = heightShowContent; i > 0; i--) {
        selectorForAnimation.style.height = i + 'px';
        animation = requestAnimationFrame(animationShowHide);
      }

    } else {
      for (let i = 0; i < heightShowContent; i++) {
        selectorForAnimation.style.height = i + 'px';
        animation = requestAnimationFrame(animationShowHide);
      }
    }
}