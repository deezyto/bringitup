import {postData} from "./services";
  
  const forms = document.querySelectorAll('form');
  console.log(forms, 'forms');

  const messagesForSendForm = {
    loading: 'Data is being sent...',
    success: 'Thank you, we will call you soon!',
    failure: 'Something went wrong...'
  };

  const messagesForWrongPhoneNumber = {
    text: 'You must enter more than 1 letter character',
    email: 'Please enter correct email: name@site.com',
    phone: {
      one: `The phone number must start with the number 1. Please enter correct phone: +1(234) 375-250`,
      two: `The first of the three digits must be in the range 2-9. Please enter correct phone: +1(234) 375-250`,
      three: `The last two digits cannot be 11. Please enter correct phone: +1(234) 375-250`
    }
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
      formMessage(messagesForSendForm.loading, form);

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
        formMessage({message: messagesForSendForm.success, form: form, style: 1});

      })
      .catch((e) => {
        console.log(e, 'dont ok');
        formMessage({message: messagesForSendForm.failure, form: form, style: 1});

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

  input.forEach((elem, i) => {

      elem.addEventListener('input', (e) => {

        if (elem.type === 'text' && elem.id !== 'phone') {
          const textRegular = /[^a-z]/ig;

          if (textRegular.test(elem.value)) {
            formMessage({message: messagesForWrongPhoneNumber.text, form: elem, parentNode: parentNode, style: style});
          } else {
            formMessage({deleteMessage: 1});
          }

          elem.value = elem.value.replace(textRegular, '');

        } else if (elem.type === 'email') {
          const emailRegular = /[^a-z0-9@.]/ig;

          if (emailRegular.test(elem.value)) {
            formMessage({message: messagesForWrongPhoneNumber.text, form: elem, parentNode: parentNode, style: style});
          } else {
            formMessage({deleteMessage: 1});
          }

          elem.value = elem.value.replace(emailRegular, '');

        } else if (elem.id === 'phone') {
          console.log('elem value 0 2-9 before', elem.value);

          mask('[name="phone"]');

          //if first n digit +n(xxx) xxx-xxxx === 1, change input value to +1
          if (elem.value.length === 1 && +elem.value.slice(0, 1) === 1) {
            elem.value = elem.value.replace(/[1]/i, '+1');

            //if first n digit +n(xxx) xxx-xxxx !== 1
          } else if (elem.value.length === 1 && +elem.value.slice(0, 1) !== 1) {
            elem.value = elem.value.replace(/[^1]/i, '+1');
            formMessage({message: messagesForWrongPhoneNumber.phone.one, form: elem, parentNode: parentNode, style: style});

            //if n digit +1(nxx) xxx-xxxx < 2
          } else if (elem.value.length === 2 && +elem.value.slice(1, 2) < 2) {
            elem.value = elem.value.slice(0, 1);

          } else if (elem.value.length === 3 && +elem.value.slice(2, 3) < 2) {
            formMessage({message: messagesForWrongPhoneNumber.phone.two, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 2);
            
          } else if (elem.value.length === 4 && +elem.value.slice(3, 4) < 2) {
            formMessage({message: messagesForWrongPhoneNumber.phone.two, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 3);
            //if n digit +1(xxx) nxx-xxxx < 2
          } else if (elem.value.length === 7 && +elem.value.slice(6, 7) < 2) {
            formMessage({message: messagesForWrongPhoneNumber.phone.two, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 6);
          } else if (elem.value.length === 9 && +elem.value.slice(8, 9) < 2) {
            formMessage({message: messagesForWrongPhoneNumber.phone.two, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 8);
            //if n1 & n2 digits +1(xnn) xxx-xxxx === 1
          } else if (elem.value.length === 6 && +elem.value.slice(4, 5) === 1 && elem.value.length === 6 && +elem.value.slice(5, 6) === 1) {
            formMessage({message: messagesForWrongPhoneNumber.phone.three, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 5);
            //if n1 & n2 digits +1(xxx) xnn-xxxx === 1
          } else if (elem.value.length === 11 && +elem.value.slice(9, 10) === 1 && elem.value.length === 11 && +elem.value.slice(10, 11) === 1) {
            formMessage({message: messagesForWrongPhoneNumber.phone.three, form: elem, parentNode: parentNode, style: style});
            elem.value = elem.value.slice(0, 10);

          } else {
            formMessage({deleteMessage: 1});
          }
        
        }
      });
  });

}

export default sendForm;