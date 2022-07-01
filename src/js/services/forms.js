import { createArrChildNodes } from "../modules/childNodes";

const postData = async (url, data) => {

  const result = await fetch(url, {
    method: "POST",
    /* json-server
    headers: {
    'Content-type': 'application/json'
    }, */
    body: data
  });
  
  //ставимо await щоб вернути promise
  //коли він буде готовий
    //return await result.json(); //json-server
    return await result.text();
  };
  
  const getRequest = async (url) => {
    const result = await fetch(url);
  
    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
  
    return await result.json();
  };


  const forms = document.querySelectorAll('form');
  console.log(forms, 'forms');

  const message = {
    loading: 'Відбувається відбравка даних',
    success: 'Дякуєм, скоро ми Вам зателефонуєм!',
    failure: 'Щось пішло не так...'
  };

  function getForm(forms) {
    forms.forEach((item) => {
      bindPostData(item);
    });
  }

  getForm(forms);

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('form submit');
      console.log(form, 'form item')
      formMassage(message.loading, form);

      const formData = new FormData(form);
      
      //json server
      //перетворюєм методом entries() formData в масив масивів
      //перетворюєм масив масивів в звичайний обєкт
      //перетворюєм обєкт в формат json
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      //postData('http://localhost:3000/posts', json)

      postData('assets/question.php', formData)

      .then(data => {
        console.log(data, 'ok');
        formMassage(message.success, form, 0, 1);

      })
      .catch((e) => {
        console.log(e, 'dont ok');
        formMassage(message.failure, form, 0, 1);

      })
      .finally(() => {

        form.reset();
      });

    });
  }


function formMassage(message, form, parentNode = 0, style=0) {
  let selector = document.querySelector('.message');

  if (!selector) {
    const element = document.createElement('div');
    element.classList.add('message');
    if (style === 1) {
      element.style.cssText = `
      display: inline-block;
      padding: 22px 24px 23px 24px;
      border-radius: 4px;
      background: white;
      font-size: 16px;
      margin-top: 30px;`;
    } else {
      element.style.cssText = `
      display: block;
      margin-top: 20px;
      padding: 5px;
      color: black;`;
    }
    
    if (parentNode === 1) {
      form.parentNode.parentNode.appendChild(element);
    } else if (parentNode === 2) {
      form.parentNode.parentNode.parentNode.appendChild(element);
    } else {
      form.parentNode.appendChild(element);
    }

    selector = document.querySelector('.message');
    
    selector.textContent = message;
  
    setTimeout(() => {
      selector.remove();
    }, 50000000);
  } else {
      selector.remove();
      formMassage(message, form, parentNode, style);
  }

}

const mask = (selector) => {

  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  function createMask(event) {

    let matrix = '+1(___) ___-____';

    let i = 0;

    let def = matrix.replace(/\D/g, '');


    let val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }
    
    this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });

    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  let inputs = document.querySelectorAll(selector);
  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

function sendForm({formInputs = ['input'], formId = 0, parentNode = 0, style = 0}) {

  //const form = document.querySelector(formParentSelector);
  const form = document.querySelectorAll('form');
  const input = form[formId].querySelectorAll(formInputs);
  //const submit = document.querySelectorAll('form button');

  const formMessages = {
    text: 'You must enter more than 1 character',
    email: 'Please enter correct email: name@site.com',
    phone: 'Please enter correct phone: +1 234 375 250'
  };

  input.forEach((elem, i) => {
      /* function CustomValidity() {
        if (elem.value.length < 1) {
          if (elem.type === 'text') {
            elem.setCustomValidity(formMessages.text);
          } else if (elem.type === 'email') {
            elem.setCustomValidity(formMessages.email);
          }
        } else {
          elem.setCustomValidity('');
        }
      }
      CustomValidity(); */

      elem.addEventListener('input', (e) => {
        elem.setCustomValidity('');
        if (elem.type === 'text') {
          const textRegular = /[^a-zA-Z]/g;

          if (textRegular.test(elem.value)) {
            formMassage(formMessages.text, elem, parentNode, style);
          }

          elem.value = elem.value.replace(textRegular, '');

        } else if (elem.type === 'email') {
          const emailRegular = /[^a-zA-Z0-9@.]/g;

          if (emailRegular.test(elem.value)) {
            formMassage(formMessages.email, elem, parentNode, style);
          }

          elem.value = elem.value.replace(emailRegular, '');

        } else if (elem.id === 'phone') {

          mask('[name="phone"]');

          let phone = /^[\+]?[(]?[2-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(elem.value);     
        }

      });

  });

  /* if (verify && item && verify === item) {
    getForm(forms);
  } */

}

export default sendForm;