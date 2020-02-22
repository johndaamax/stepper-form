// Signal which part of the form is visible to the user
let formStep = 0;
//Array that holds the values of the inputs of the form, empty at the start
let inputValues = [];

const inputParameters = {
    //parameters for each of our 3 inputs
    validationRules : [{minLength: 4}, {minLength: 8, maxLength: 16}, {isEmail: true}],
    errorMessages : ['Username must be at least 4 characters long.', 'Password must be between 8 and 16 characters.', 'Invalid email format.']
}
const inputs = document.querySelectorAll('.input-content');
const errorElements = document.querySelectorAll('.error-message');

//Basic validation method that uses supplied rules object to validate the given value
function validate(value, rules) {
    let isValid = true;

    if(rules.minLength)
        isValid = isValid && value.length >= rules.minLength;
    if(rules.maxLength)
        isValid = isValid && value.length <= rules.maxLength;
    if(rules.isEmail)
        isValid = isValid && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value); 
    return isValid;
}

//Init and set up listeners for continue buttons
const continueButtons = document.querySelectorAll('.continue-button');
continueButtons.forEach((button, idx) => {
    button.addEventListener('click', (event) => {
        //validate current input
        if(validate(inputValues[idx], inputParameters.validationRules[idx])) {
            //proceed to next input
            formStep++;
            for(let i = 0; i < inputs.length; i++){
                inputs[i].style.display = 'none';
            }
            inputs[formStep].style.display = 'block';
            errorElements[idx].textContent = '';
        } else {
            errorElements[idx].textContent = inputParameters.errorMessages[idx];
        }
    });
    button.disabled = true;
});

//Init and set up listeners for back buttons
const backButtons = document.querySelectorAll('.back-button')
backButtons.forEach(button => button.addEventListener('click', (event) => {
        formStep--;
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style.display = 'none';
        }
        inputs[formStep].style.display = 'block';
    }));

for(let i = 0; i < inputs.length; i++){
    i !== 0 && (inputs[i].style.display = 'none');
    inputs[i].addEventListener('input', (event) => {
        inputValues[i] = event.target.value;
        // very basic validation check to prevent continuing with empty values
        continueButtons[i].disabled = event.target.value.trim() === '';
    })
}

document.querySelector('#example-form').addEventListener('submit', (event) => {
    event.preventDefault();
    backButtons[backButtons.length - 1].disabled = true;
    document.querySelector('#submitted-success').textContent = "Form submitted. Open console to inspect submitted values!"
    console.log('Form values:', {username: inputValues[0], password: inputValues[1], email: inputValues[2]});
})
