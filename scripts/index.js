const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const popupEdit = document.querySelector(".popup_prof");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__closed");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupNameInput = document.getElementById("NameInputId");
const popupJobInput = document.getElementById("JobInputId");
const popupForm = document.querySelector(".popup__form");
const popupAdd = document.querySelector(".popup_add");
const popupAddButton = document.querySelector(".profile__add-button");
const popupAddInputName = document.querySelector(".popup__add-name");
const popupAddInputUrl = document.querySelector(".popup__add-url");
const popupSubmitBtn = document.querySelector(".popup__submit-add");
const popupGalleryOpen = document.querySelector(".popup_gallery");
const popupGalleryContainer = document.querySelector(
  ".popup__gallery-container"
);
const popupGalleryPhoto = document.querySelector(".popup__gallery-photo");
const popupGalleryCloseBt = document.querySelector(".popup__gallery-closed");
const popupGallery = document.querySelector(".popup_gallery");
const elementsGallery = document.getElementById("idElements");
const cardContainer = document.querySelector(".elements");
const popupImgDescr = document.querySelector(".popup__image-description");

function openPopupEdit() {
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
  openPopup(popupEdit);
}

function saveInputInfo(event) {
  event.preventDefault();
  profileTitle.textContent = popupNameInput.value;
  profileSubtitle.textContent = popupJobInput.value;
  closeActivePopup();
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeActivePopupEsc);
  toggleButtonState(popup.querySelector('form'), validationConfig);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeActivePopupEsc);
}

function closeActivePopup() {
  const activePopup = document.querySelector('.popup_opened');

  if (activePopup) {
    closePopup(activePopup);
  }
}

function closeActivePopupEsc(event) {
  if (event.key === "Escape") {
    closeActivePopup();
  }
}

function openPopupAdd() {
  popupAddInputName.value = "";
  popupAddInputUrl.value = "";
  openPopup(popupAdd);
}

function like(event) {
  event.target.classList.toggle("element__like-button_active");
}

function saveAddCard(event) {
  event.preventDefault();
  const addValues = {
    name: popupAddInputName.value,
    link: popupAddInputUrl.value,
  };
  const imageItem = createGalery(addValues);
  cardContainer.prepend(imageItem);
  closeActivePopup();
}

function deleteCard(event) {
  event.target.closest(".element").remove();
}

const createGalery = (elementGallery) => {
  const card = elementsGallery.content
    .querySelector(".element")
    .cloneNode(true);
  const imageElement = card.querySelector(".element__image");

  imageElement.src = elementGallery.link;
  imageElement.alt = elementGallery.name;
  card.querySelector(".element__title").textContent = elementGallery.name;
  card.querySelector(".element__like-button").addEventListener("click", like);
  card.querySelector(".element__delete").addEventListener("click", deleteCard);
  imageElement.addEventListener("click", () => openPopupGallery(elementGallery));
  return card;
};

function openPopupGallery({ link, name }) {
  popupGalleryPhoto.src = link;
  popupGalleryPhoto.alt = name;
  popupImgDescr.innerText = name;
  openPopup(popupGalleryOpen);
}

document.querySelectorAll(".popup").forEach((el) => {
  el.addEventListener("mousedown", (event) => {
    if (event.target === el) {
      closeActivePopup();
    }
  });
});
popupForm.addEventListener("submit", saveInputInfo);
popupEditButton.addEventListener("click", openPopupEdit);
popupCloseButtons.forEach((button) => button.addEventListener("click", closeActivePopup));
popupGalleryCloseBt.addEventListener("click", closeActivePopup);
popupSubmitBtn.addEventListener("click", saveAddCard);
popupAddButton.addEventListener("click", openPopupAdd);

initialCards.forEach((object) => {
  const newCard = createGalery(object);
  cardContainer.prepend(newCard);
});

enableValidation(validationConfig);
