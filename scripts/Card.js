export class Card {
  constructor(dataCard, templateContainer, openPopupGallery) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._dataCard = dataCard;
    this._templateContainer = templateContainer;
    this._openPopupGallery = openPopupGallery;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateContainer)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _setData() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
  }

  _deleteCardButton() {
    this._element.remove();
    this._element = null;
  }

  _likeCardButton() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _addEventListeners() {
    this._likeButton.addEventListener("click", () => this._likeCardButton());

    this._deleteButton.addEventListener("click", () =>
      this._deleteCardButton()
    );
    this._imageElement.addEventListener("click", () => {
      this._openPopupGallery(this._dataCard);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__image");
    this._titleElement = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._setData();
    this._addEventListeners();
    return this._element;
  }
}
