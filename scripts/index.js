const popupEdit = document.querySelector(".popup_prof");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__closed");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupNameInput = document.getElementById("NameInputId");
const popupJobInput = document.getElementById("JobInputId");
const popupForm = document.querySelector(".popup__form");
const likeButtons = document.querySelectorAll(".element__like-button");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};
let activePopup = null;

function openPopupEdit() {
  const inputEvent = new Event("input");
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
  popupNameInput.dispatchEvent(inputEvent);
  popupJobInput.dispatchEvent(inputEvent);
  openPopup(popupEdit);
}

function save(event) {
  event.preventDefault();
  profileTitle.textContent = popupNameInput.value;
  profileSubtitle.textContent = popupJobInput.value;
  closeActivePopup();
}

function openPopup(popup) {
  activePopup = popup;
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeActivePopupEsc);
}

function closeActivePopup() {
  if (activePopup) {
    activePopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeActivePopupEsc);
    activePopup = null;
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

popupForm.addEventListener("submit", save);
popupOpenButton.addEventListener("click", openPopupEdit);
popupCloseButton.addEventListener("click", closeActivePopup);

const popupAdd = document.querySelector(".popup_add");
const popupAddButton = document.querySelector(".profile__add-button");
const popupAddCloseButton = document.querySelector(".popup__add-closed");
const popupAddInputName = document.querySelector(".popup__add-name");
const popupAddInputUrl = document.querySelector(".popup__add-url");
const popupSubmitBtn = document.querySelector(".popup__submit-add");

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
popupSubmitBtn.addEventListener("click", saveAddCard);
popupAddButton.addEventListener("click", openPopupAdd);
popupAddCloseButton.addEventListener("click", closeActivePopup);

function deleteCard(event) {
  event.target.closest(".element").remove();
}

const popupGallery = document.querySelector(".popup_gallery");
const elementsGallery = document.getElementById("idElements");
const cardContainer = document.querySelector(".elements");
const popupImgDescr = document.querySelector(".popup__image-description");

const createGalery = (elementGallery) => {
  const card = elementsGallery.content
    .querySelector(".element")
    .cloneNode(true);
  card.querySelector(".element__image").src = elementGallery.link;
  card.querySelector(".element__image").alt = elementGallery.name;
  card.querySelector(".element__title").textContent = elementGallery.name;
  card.querySelector(".element__like-button").addEventListener("click", like);
  card.querySelector(".element__delete").addEventListener("click", deleteCard);
  card
    .querySelector(".element__image")
    .addEventListener("click", openPopupGallery);
  return card;
};

initialCards.forEach((object) => {
  const newCard = createGalery(object);
  cardContainer.prepend(newCard);
});

const popupGalleryOpen = document.querySelector(".popup_gallery");
const popupGalleryContainer = document.querySelector(
  ".popup__gallery-container"
);
const popupGalleryPhoto = document.querySelector(".popup__gallery-photo");
const popupGalleryCloseBt = document.querySelector(".popup__gallery-closed");

function openPopupGallery(event) {
  const { alt, src } = event.target;
  popupGalleryPhoto.src = src;
  popupGalleryPhoto.alt = alt;
  popupImgDescr.innerText = alt;
  openPopup(popupGalleryOpen);
}

popupGalleryCloseBt.addEventListener("click", closeActivePopup);

document.querySelectorAll(".popup").forEach((el) => {
  el.addEventListener("click", (event) => {
    if (event.target === el) {
      closeActivePopup();
    }
  });
});

enableValidation(validationConfig);
