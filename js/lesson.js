// PHONE BLOCK
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'Ok';
        phoneResult.style.color = 'green';
    } else {
        phoneResult.innerHTML = 'not Ok';
        phoneResult.style.color = 'red';
    }
}