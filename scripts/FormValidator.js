export class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  enableButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  };

  disableButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _toggleButtonState = (buttonElement, inputList) => {
    const isFormInvalid = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (isFormInvalid) {
      this.disableButton(buttonElement);
    } else {
      this.enableButton(buttonElement);
    }
  };

  _validateInput = (formElement, inputElement) => {
    const isInputValid = inputElement.validity.valid;

    if (isInputValid) {
      this._hideInputError(formElement, inputElement);
    } else {
      this._showInputError(formElement, inputElement);
    }
  };

  enableValidation = () => {
    document.querySelectorAll(this._formSelector).forEach((formElement) => {
      const buttonElement = formElement.querySelector(
        this._submitButtonSelector
      );
      const inputList = [...formElement.querySelectorAll(this._inputSelector)];

      this._toggleButtonState(buttonElement, inputList);

      formElement
        .querySelectorAll(this._inputSelector)
        .forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._validateInput(formElement, inputElement);
            this._toggleButtonState(buttonElement, inputList);
          });
        });
    });
  };
}
