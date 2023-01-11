const toggleButtonState = (inputList, buttonElement, config) => {
  const isFormInvalid = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (isFormInvalid) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }

  buttonElement.disabled = isFormInvalid;
};

const enableValidation = (config) => {
  document.querySelectorAll(config.formSelector).forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const errorElement = formElement.querySelector(
          `.${inputElement.id}-error`
        );
        const isInputValid = inputElement.validity.valid;

        if (isInputValid) {
          inputElement.classList.remove(config.inputErrorClass);
          errorElement.classList.remove(config.errorClass);
        } else {
          inputElement.classList.add(config.inputErrorClass);
          errorElement.classList.add(config.errorClass);
        }

        errorElement.textContent = isInputValid
          ? ""
          : inputElement.validationMessage;
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  });
};
