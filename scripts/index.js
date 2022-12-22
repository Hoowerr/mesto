const popupEdit = document.querySelector(".popup_prof");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__closed");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupNameInput = document.getElementById("NameInputId");
const popupJobInput = document.getElementById("JobInputId");
const popupForm = document.querySelector(".popup__form");
const likeButtons = document.querySelectorAll(".element__like-button");

function openPopup() {
  popupEdit.classList.add("popup_opened");
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popupEdit.classList.remove("popup_opened");
}

function save(event) {
  event.preventDefault();
  profileTitle.textContent = popupNameInput.value;
  profileSubtitle.textContent = popupJobInput.value;
  closePopup();
}

function like(event) {
  event.target.classList.toggle("element__like-button_active");
}

popupForm.addEventListener("submit", save);
popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);

const popupAdd = document.querySelector(".popup_add");
const popupAddButton = document.querySelector(".profile__add-button");
const popupAddCloseButton = document.querySelector(".popup__add-closed");
const popupAddInputName = document.querySelector(".popup__add-name");
const popupAddInputUrl = document.querySelector(".popup__add-url");
const popupSubmitBtn = document.querySelector(".popup__submit-add");
function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}

function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}

function saveAddCard(event) {
  event.preventDefault();
  const addValues = {
    name: popupAddInputName.value,
    link: popupAddInputUrl.value,
  };
  const imageItem = createGalery(addValues);
  cardContainer.prepend(imageItem);
  closePopupAdd(popupAdd);
}
popupSubmitBtn.addEventListener("click", saveAddCard);
popupAddButton.addEventListener("click", openPopupAdd);
popupAddCloseButton.addEventListener("click", closePopupAdd);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
  popupAddInputName.value = "";
  popupAddInputUrl.value = "";
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
  popupGalleryOpen.classList.add("popup_opened");
}
function closePopupGallery() {
  popupGalleryOpen.classList.remove("popup_opened");
}

popupGalleryCloseBt.addEventListener("click", closePopupGallery);
