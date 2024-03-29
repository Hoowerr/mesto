import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._buttonSave = this._popup.querySelector(".popup__button");
  }

  setButtonText(text) {
    this._buttonSave.textContent = text;
  }

  handleFormSubmit(submit) {
    this._handleFormSubmit = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
