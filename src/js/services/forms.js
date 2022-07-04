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

      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else if (i >= val.length) {
        return '';
      } else {
        return a;
      }

      //return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
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

  const form = document.querySelectorAll('form');
  const input = form[formId].querySelectorAll(formInputs);
  //const submit = document.querySelectorAll('form button');

  const formMessages = {
    text: 'You must enter more than 1 letter character',
    email: 'Please enter correct email: name@site.com',
    phone: 'Please enter correct phone: +1 234 375 250'
  };

  let template = '+1 (___) ___ ____';
  
  input.forEach((elem, i) => {

      elem.addEventListener('input', (e) => {
        elem.setCustomValidity('');
        if (elem.type === 'text' && elem.id !== 'phone') {
          const textRegular = /[^a-z]/ig;

          if (textRegular.test(elem.value)) {
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
          } else {
            formMessage({deleteMessage: 1});
          }

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

        
          //usa номер складається з +1 NXX NXX XXXX
          //де n - номер від 2 до 9
          //x число від 0 до 9, але не може бути xx 11
          //xxxx - можуть бути любі цифри
          //на єтапі ввода користувачем номера, якщо він ввів
          //цифру не правильно, потрібно зупинити ввід наступної
          //цифри і повідомити про це відповідним текстом і
          //виділити неправильну цифру в input


          mask('[name="phone"]');
          console.log(elem.value, 'elem.value', elem.value.length, 'elem.length');
          
          if (elem.value.length === 1 && +elem.value.slice(0, 1) !== 1) {
            elem.value = elem.value.replace(/[^1]/i, '+1');
            
          } else if (elem.value.length > 3 && +elem.value.slice(3, 4) < 2) {
            console.log('elem value 0 2-9', elem.value.slice(0, 3) );
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 3);

          } else if (elem.value.length === 9 && +elem.value.slice(8, 9) < 2) {
            console.log('elem value 4 2-9');
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 8);

          } else if (elem.value.length === 6 && +elem.value.slice(4, 5) === 1 && elem.value.length === 6 && +elem.value.slice(5, 6) === 1) {
            console.log('elem value 2-3 dont 11');
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 5);

          } else if (elem.value.length === 11 && +elem.value.slice(9, 10) === 1 && elem.value.length === 11 && +elem.value.slice(10, 11) === 1) {
            console.log('elem value 5-6 dont 11 ');
            formMessage({message: formMessages.text, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 10);

          } else {
            formMessage({deleteMessage: 1});
          }
        

        }
      });

  });

}

export default sendForm;