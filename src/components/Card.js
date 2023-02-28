export default class Card {
  constructor({
    dataCard,
    templateContainer,
    userId,
    openPopupGallery,
    handleSetCardLike,
    handleDelCardLike,
    handleDeleteCard,
  }) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._cardId = dataCard._id;
    this._dataCard = dataCard;
    this._userId = userId;
    this._ownerId = dataCard.owner._id;
    this._templateContainer = templateContainer;
    this._openPopupGallery = openPopupGallery;
    this._handleSetCardLike = handleSetCardLike;
    this._handleDelCardLike = handleDelCardLike;
    this._handleDeleteCard = handleDeleteCard;
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

  deleteCardButton() {
    this._element.remove();
  }

  likeCardButton(dataCard) {
    this._likes = dataCard.likes;
    this._likesCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle("element__like-button_active");
  }

  _likeStatus() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }

  _setDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }

  _addEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like-button_active")) {
        this._handleDelCardLike(this._cardId);
      } else {
        this._handleSetCardLike(this._cardId);
      }
    });

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._cardId)
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
    this._likesCounter = this._element.querySelector(".element__like-count");
    this._likesCounter.textContent = this._likes.length;
    this._likeStatus();
    this._setDeleteButton();
    this._setData();
    this._addEventListeners();
    return this._element;
  }
}
