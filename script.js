const form = document.querySelector('#form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const passwordConfirmInput = document.querySelector('#passwordConfirm');

const setError = function (element, errorMessage) {
  const parent = element.parentElement;
  if (parent.classList.contains('success')) {
    parent.classList.remove('success');
  }
  parent.classList.add('error');
  const paragraph = parent.nextElementSibling;
  paragraph.textContent = errorMessage;
};

const setSuccess = function (element) {
  const parent = element.parentElement;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
  parent.classList.add('success');
};

const isEmailValid = function (email) {
  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regEx.test(email);
};

const validateForm = function () {
  // USERNAME
  if (!usernameInput.value) {
    setError(usernameInput, 'Name cannot be empty');
  } else if (
    usernameInput.value.length < 5 ||
    usernameInput.value.length > 15
  ) {
    setError(usernameInput, 'Must be between 5 and 15 characters');
  } else {
    setSuccess(usernameInput);
  }

  // EMAIL ADDRESS
  if (!emailInput.value) {
    setError(emailInput, 'Email cannot be empty');
  } else if (!isEmailValid(emailInput.value)) {
    setError(emailInput, 'This is not a valid email');
  } else {
    setSuccess(emailInput);
  }

  // PASSWORD
  if (!passwordInput.value) {
    setError(passwordInput, 'Password cannot be empty');
  } else if (
    passwordInput.value.length < 6 ||
    passwordInput.value.length > 20
  ) {
    setError(passwordInput, 'Must be between 6 and 20 characters');
  } else {
    setSuccess(passwordInput);
  }

  // CONFIRM PASSWORD
  if (!passwordConfirmInput.value) {
    setError(passwordConfirmInput, 'Password cannot be empty');
  } else if (passwordConfirmInput.value !== passwordInput.value) {
    setError(passwordConfirmInput, 'Password does not match');
  } else {
    setSuccess(passwordConfirmInput);
  }
};

const isFormValid = function () {
  const inputContainers = form.querySelectorAll('.input-group');
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains('error')) {
      result = false;
    }
  });
  return result;
};

form.addEventListener('submit', (event) => {
  validateForm();

  if (isFormValid() === true) {
    form.submit();
  } else {
    event.preventDefault();
  }
});
