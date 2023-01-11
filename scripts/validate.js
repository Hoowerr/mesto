const toggleButtonState = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const isFormInvalid = [...formElement.querySelectorAll(config.inputSelector)].some((inputElement) => !inputElement.validity.valid);

  if (isFormInvalid) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }

  buttonElement.disabled = isFormInvalid;
};

const showInputError = (inputElement, config) => {
  const errorElement = inputElement.parentNode.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.parentNode.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const validateInput = (inputElement, config) => {
  const isInputValid = inputElement.validity.valid;

  if (isInputValid) {
    hideInputError(inputElement, config);
  } else {
    showInputError(inputElement, config);
  }
};

const enableValidation = (config) => {
  document.querySelectorAll(config.formSelector).forEach((formElement) => {
    toggleButtonState(formElement, config);

    formElement.querySelectorAll(config.inputSelector).forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        validateInput(inputElement, config);
        toggleButtonState(formElement, config);
      });
    });
  });
};
