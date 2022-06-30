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

  forms.forEach((item) => {
    bindPostData(item);
  });

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
        formMassage(message.success, form);

      })
      .catch((e) => {
        console.log(e, 'dont ok');
        formMassage(message.failure, form);

      })
      .finally(() => {

        form.reset();
      });

    });
  }


function formMassage(message, form) {

  const element = document.createElement('div');
  element.classList.add('message');
  element.style.cssText = `
  display: block;
  margin-top: 20px;
  padding: 5px;
  color: black;`;
  form.parentNode.appendChild(element);

  document.querySelector('.message').textContent = message;
  
  setTimeout(() => {
    document.querySelector('.message').remove();
  }, 5000);

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

function sendForm({formParentSelector}) {


  const form = document.querySelector(formParentSelector);
  const form1 = document.querySelectorAll('form');
  const input = form1[0].querySelectorAll(['input', 'select']);
  const submit = document.querySelectorAll('form button');
  
  input.forEach((elem, i) => {

      elem.addEventListener('input', (e) => {

        if (elem.type === 'email') {
          elem.value = elem.value.replace(/[^a-zA-Z0-9@.]/g, '');
          elem.placeholder = 'Please input correct e-mail';
        } else if (elem.id === 'phone') {

          mask('[name="phone"]');

          let phone = /^[\+]?[(]?[2-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(elem.value);
          
        } else if (elem.type === 'text') {
            elem.value = elem.value.replace(/[^a-zA-Z]/g, '');
            elem.placeholder = 'Only Latin letters';
        }

      });

  });



}

export default sendForm;