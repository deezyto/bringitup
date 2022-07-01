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
      console.log(form, 'form item');
      formMessage(message.loading, form);

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
        formMessage({message: message.success, form: form, style: 1});

      })
      .catch((e) => {
        console.log(e, 'dont ok');
        formMessage({message: message.failure, form: form, style: 1});

      })
      .finally(() => {
        form.reset();
      });

    });
  }


function formMessage({message = '', form = '', parentNode = 0, style = 0, deleteMessage = 0}) {
  let selector = document.querySelector('.message');

    if (selector && deleteMessage) {
        selector.remove();
    }

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
      } else if (style === 2) {
        element.style.cssText = `
        display: inline-block;
        padding: 22px 24px 23px 24px;
        opacity: .5;
        border-radius: 4px;
        background-color: #2546bc;
        font-size: 16px;
        color: white;
        margin-top: 30px;`;
      } else {
        element.style.cssText = `
        display: block;
        margin-top: 20px;
        padding: 5px;
        color: black;`;
      }
      
      try {
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
        }, 5000);
      } catch {

      }
    
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
    text: 'You must enter more than 1 letter character',
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
        if (elem.type === 'text' && elem.id !== 'phone') {
          const textRegular = /[^a-z]/ig;

          if (textRegular.test(elem.value)) {
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
          } else {
            formMessage({deleteMessage: 1});
          }
          
          /* if (textRegular.test(elem.value) === 'false') {
            const selector = document.querySelector('.message');
            selector.remove();
            //formMassage({message: formMessages.text, form: elem, parentNode: parentNode, style: style, deleteMessage: 1});
          } */

          /* if (!textRegular.test(elem.value)) {
            formMessage({deleteMessage: 1});
          } */

          elem.value = elem.value.replace(textRegular, '');

        } else if (elem.type === 'email') {
          const emailRegular = /[^a-z0-9@.]/ig;

          if (emailRegular.test(elem.value)) {
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
          } else {
            formMessage({deleteMessage: 1});
          }

          elem.value = elem.value.replace(emailRegular, '');

        } else if (elem.id === 'phone') {
          //const phoneRegular = /^[\+]?[(]?[2-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ig;
          //const telephone = '+3 (809) - 393 - 393j';
          //^(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}$/;
          //^ початок рядка даних
          //(?:\d{3}|
          const phoneRegular = /^\+?1?(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}$/;

          const telephone = '+1250-353-4804';
          const test = 'j';
          console.log(phoneRegular.exec(telephone));


          let count = 0;

          for (let i = 0; i < telephone.length - 3; i++) {
            if (telephone[0] === '+') {
              count++;
            } else if (telephone[1] === '1') {
              count++;
            } else if (telephone[2] === '3') {

            }


          }

          const regular = /\+1/ig;
          const teststr = '0+1';
          //перша цифра 1
          //перша цифра із трьох починається з цифри 2
          //цифр 10
          //із трьох цифр можуть повторюватись максимум 2

          console.log(teststr.search(regular));


          if (phoneRegular.test(elem.value)) {
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
          } else {
            formMessage({deleteMessage: 1});
          }

          mask('[name="phone"]');

          phoneRegular.test(elem.value);     
        }

      });

  });

  /* if (verify && item && verify === item) {
    getForm(forms);
  } */

}

export default sendForm;