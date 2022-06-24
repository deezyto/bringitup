export function showContentTimeout(selector, pageNumber) {
    const showContent = document.querySelector(selector);
    showContent.style.display = 'none';
    if (pageNumber === 3) {
      setTimeout(() => {
        showContent.style.display = 'block';
      }, 3000);
    }
}