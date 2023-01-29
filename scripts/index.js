import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationConfig } from "./constans.js";

const popupEdit = document.querySelector(".popup_prof");
const popupEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__closed");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupNameInput = document.getElementById("NameInputId");
const popupJobInput = document.getElementById("JobInputId");
const popupEditForm = document.querySelector(".popup__form-edit");
const popupAdd = document.querySelector(".popup_add");
const popupAddForm = document.querySelector(".popup__add-form");
const popupAddButton = document.querySelector(".profile__add-button");
const popupAddInputName = document.querySelector(".popup__add-name");
const popupAddInputUrl = document.querySelector(".popup__add-url");
const popupGalleryOpen = document.querySelector(".popup_gallery");
const popupGalleryPhoto = document.querySelector(".popup__gallery-photo");
const cardContainer = document.querySelector(".elements");
const popupImgDescr = document.querySelector(".popup__image-description");

const popupAddFormValidator = new FormValidator(validationConfig, popupAddForm);
const popupEditFormValidator = new FormValidator(validationConfig, popupEditForm);

function openPopupEdit() {
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
  popupEditFormValidator.resetValidation();
  openPopup(popupEdit);
}

function saveInputInfo(event) {
  event.preventDefault();
  profileTitle.textContent = popupNameInput.value;
  profileSubtitle.textContent = popupJobInput.value;
  closePopup(popupEdit);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeActivePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeActivePopupEsc);
}

function closeActivePopup() {
  closePopup(document.querySelector(".popup_opened"));
}

function closeActivePopupEsc(event) {
  if (event.key === "Escape") {
    closeActivePopup();
  }
}

function openPopupAdd() {
  popupAddInputName.value = "";
  popupAddInputUrl.value = "";
  popupAddFormValidator.resetValidation();
  openPopup(popupAdd);
}

function saveAddCard(event) {
  event.preventDefault();
  const addValues = {
    name: popupAddInputName.value,
    link: popupAddInputUrl.value,
  };
  const imageItem = createGalery(addValues);
  cardContainer.prepend(imageItem);
  closePopup(popupAdd);
}

const createGalery = (dataCard) => {
  return new Card(dataCard, "#idElements", openPopupGallery).generateCard();
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
      closePopup(el);
    }
  });
});
popupEditForm.addEventListener("submit", saveInputInfo);
popupEditButton.addEventListener("click", openPopupEdit);
popupCloseButtons.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});
popupAddForm.addEventListener("submit", saveAddCard);
popupAddButton.addEventListener("click", openPopupAdd);

initialCards.forEach((object) => {
  const newCard = createGalery(object);
  cardContainer.prepend(newCard);
});
popupAddFormValidator.enableValidation();
popupEditFormValidator.enableValidation();
