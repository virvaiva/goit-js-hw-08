import storageAPI from './storage';
var throttle = require('lodash.throttle');

let form = document.querySelector('.feedback-form');

initPage()
form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', handleSubmit);

function handleInput (event) {
    const {name, value} = event.target;
    
    let savedData = storageAPI.load('feedback-form-state');
    savedData = savedData ? savedData : {};
    savedData[name] = value;
    storageAPI.save('feedback-form-state', savedData);

    console.log(handleInput);
}

function initPage () {
   const savedData = storageAPI.load('feedback-form-state');
    if (!savedData) {
        return;
    }
    Object.entries(savedData).forEach(([name, value]) => {
        form.elements[name].value = value;
    })
}

function handleSubmit (event) {
    event.preventDefault();
    const {
        elements: {email, message}
    } = event.currentTarget;

    console.log({email: email.value, message: message.value});

    event.currentTarget.reset();
    storageAPI.remove('feedback-form-state');
}