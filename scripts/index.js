const popupEdit = document.querySelector('.popup_prof');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__closed');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupNameInput = document.getElementById('NameInputId');
const popupJobInput = document.getElementById('JobInputId');
const popupForm = document.querySelector('.popup__form');
const likeButtons = document.querySelectorAll('.element__like-button');

function openPopup() {
  popupEdit.classList.add('popup_opened');
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popupEdit.classList.remove('popup_opened');
}

function save(event) {
  event.preventDefault();
  profileTitle.textContent = popupNameInput.value;
  profileSubtitle.textContent = popupJobInput.value;
  closePopup();
}

function like(event) {
  event.target.classList.toggle('element__like-button_active');
}

popupForm.addEventListener('submit', save);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
likeButtons.forEach((button) => button.addEventListener('click', like));

// попап добавления фотографий

const popupAdd = document.querySelector('.popup_add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__add-closed');


function openPopupAdd () {
  popupAdd.classList.add('popup_opened');
}

function closePopupAdd () {
  popupAdd.classList.remove('popup_opened');
}

popupAddButton.addEventListener('click', openPopupAdd);
popupAddCloseButton.addEventListener('click', closePopupAdd);
