import "./index.css";

import { initialCards, validationConfig } from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupEditButton = document.querySelector(".profile__edit-button");
const popupEditForm = document.querySelector(".popup__form-edit");
const popupAddForm = document.querySelector(".popup__add-form");
const popupAddButton = document.querySelector(".profile__add-button");
const popupProfileName = document.querySelector(".popup__input_edit_name");
const popupProfileJob = document.querySelector(".popup__input_edit_job");

const popupAddFormValidator = new FormValidator(validationConfig, popupAddForm);
const popupEditFormValidator = new FormValidator(
  validationConfig,
  popupEditForm
);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItem(createGalery(data));
    },
  },
  ".elements"
);
cardSection.renderItems();

const saveInputInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__subtitle",
});

const popupGallery = new PopupWithImage(".popup_gallery");
popupGallery.setEventListeners();
function openPopupGallery(name, link) {
  popupGallery.open(name, link);
}

const popupEdit = new PopupWithForm(".popup_prof", {
  handleFormSubmit: (formData) => {
    saveInputInfo.setUserInfo(formData);
    popupEdit.close();
  },
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_add", {
  handleFormSubmit: (formData) => {
    cardSection.addItem(
      new Card(formData, "#idElements", openPopupGallery).generateCard()
    );
    popupAdd.close();
  },
});
popupAdd.setEventListeners();

const handleEditButtonClick = () => {
  popupEditFormValidator.resetValidation();
  const profileInfo = saveInputInfo.getUserInfo();
  popupProfileName.value = profileInfo.name;
  popupProfileJob.value = profileInfo.description;
  popupEdit.open();
};

const handleAddButtonClick = () => {
  popupAdd.open();
  popupAddFormValidator.resetValidation();
};

popupEditButton.addEventListener("click", handleEditButtonClick);
popupAddButton.addEventListener("click", handleAddButtonClick);

function createGalery(dataCard) {
  return new Card(dataCard, "#idElements", openPopupGallery).generateCard();
}

popupAddFormValidator.enableValidation();
popupEditFormValidator.enableValidation();
