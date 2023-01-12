const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};

const toggleButtonState = (buttonElement, inputList, config) => {
  const isFormInvalid = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (isFormInvalid) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
};

const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const validateInput = (formElement, inputElement, config) => {
  const isInputValid = inputElement.validity.valid;

  if (isInputValid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
};

const enableValidation = (config) => {
  document.querySelectorAll(config.formSelector).forEach((formElement) => {
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
    const inputList = [...formElement.querySelectorAll(config.inputSelector)];

    toggleButtonState(buttonElement, inputList, config);

    formElement
      .querySelectorAll(config.inputSelector)
      .forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          validateInput(formElement, inputElement, config);
          toggleButtonState(buttonElement, inputList, config);
        });
      });
  });
};
