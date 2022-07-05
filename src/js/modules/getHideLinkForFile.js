
//when the download button is clicked, a link is created
//and the file is downloaded, after which the link is deleted
function getLink(link = 0) {

  const linkList = {
    bitmap: {
      name: 'bitmap',
      link: '../assets/img/Bitmap.jpg'
    },
    one: {
      name: 'one',
      link: '../assets/img/feed_1.png'
    },
    two: {
      name: 'two',
      link: '../assets/img/feed_2.png'
    },
    three: {
      name: 'three',
      link: '../assets/img/main_light.jpg'
    },
    four: {
      name: 'four',
      link: '../assets/img/module_bg.jpg'
    },
    five: {
      name: 'five',
      link: '../assets/img/showup.jpg'
    },
    computer: {
      name: 'computer',
      link: '../assets/img/slide_1_m.jpg'
    },
    site: {
      name: 'site',
      link: '../assets/img/talk_bg.jpg'
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
  
function download({selectorButton, attributeLink}) {

  const button = document.querySelectorAll(selectorButton);
  const link = document.querySelectorAll(`[${attributeLink}]`);

  button.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      getLink(link[i].getAttribute(attributeLink));
    });
  });

}

export default download;