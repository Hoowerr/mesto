export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._inputList = [...formElement.querySelectorAll(this._inputSelector)];
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  enableButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  disableButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _toggleButtonState = () => {
    const isFormInvalid = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (isFormInvalid) {
      this.disableButton(this._buttonElement);
    } else {
      this.enableButton(this._buttonElement);
    }
  };

  _validateInput = (inputElement) => {
    const isInputValid = inputElement.validity.valid;

    if (isInputValid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  enableValidation = () => {
    this._toggleButtonState(this._buttonElement, this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateInput(inputElement);
        this._toggleButtonState();
      });
    });
    return this;
  };
}
