import "./index.css";
import { initialCards, validationConfig } from "../utils/constants.js";
import {
  popupEditButton,
  profileTitle,
  profileSubtitle,
  popupEditForm,
  popupAddForm,
  popupAddButton,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

popupEditButton.addEventListener("click", () => {
  popupEdit.open();
  const profileInfo = saveInputInfo.getUserInfo();
  profileTitle.value = profileInfo.name;
  profileSubtitle.value = profileInfo.description;
});

popupAddButton.addEventListener("click", () => {
  popupAdd.open();
  popupAddFormValidator.resetValidation();
});

function createGalery(dataCard) {
  return new Card(dataCard, "#idElements", openPopupGallery).generateCard();
}

popupAddFormValidator.enableValidation();
popupEditFormValidator.enableValidation();
