import "./index.css";

import { validationConfig, apiConfig } from "../utils/constants.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

const popupEditButton = document.querySelector(".profile__edit-button");
const popupEditForm = document.querySelector(".popup__form-edit");
const popupAddForm = document.querySelector(".popup__add-form");
const popupAddButton = document.querySelector(".profile__add-button");
const popupProfileName = document.querySelector(".popup__input_edit_name");
const popupProfileJob = document.querySelector(".popup__input_edit_job");
const profileAvatarbutton = document.querySelector(".profile__avatar-button");
const popupAvatarForm = document.querySelector(".popup__avatar-form");
let userId;

const openPopupGallery = (name, link) => {
  popupGallery.open(name, link);
};

const api = new Api(apiConfig);

const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItem(createGalery(data));
    },
  },
  ".elements"
);

const saveInputInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__subtitle",
  avatar: ".profile__avatar",
});

const popupDelCard = new PopupDeleteCard({
  popupSelector: ".popup_gallery-delete",
});

const popupGallery = new PopupWithImage(".popup_gallery");

const popupEdit = new PopupWithForm({
  popupSelector: ".popup_prof",
  handleFormSubmit: (formData) => {
    popupEdit.setButtonText("Сохранение...");
    api
      .editUserInfo(formData)
      .then((formData) => {
        saveInputInfo.setUserInfo(formData);
        popupEdit.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => popupEdit.setButtonText("Сохранить"));
  },
});

const popupAdd = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (formData) => {
    popupAdd.setButtonText("Сохранение...");
    api
      .addNewCard(formData)
      .then((formData) => {
        cardSection.addItem(createGalery(formData));
        popupAdd.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => popupAdd.setButtonText("Сохранить"));
  },
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_add-avatar",
  handleFormSubmit: (formData) => {
    popupEditAvatar.setButtonText("Сохранение...");
    api
      .setAvatar(formData)
      .then((formData) => {
        saveInputInfo.setUserInfo(formData);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => popupEditAvatar.setButtonText("Сохранить"));
  },
});

const createGalery = (dataCard) => {
  const card = new Card({
    dataCard,
    templateContainer: "#idElements",
    userId,
    openPopupGallery,
    handleSetCardLike(cardId) {
      api
        .addLike(cardId)
        .then((dataCard) => {
          card.likeCardButton(dataCard);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleDelCardLike(cardId) {
      api
        .removeLike(cardId)
        .then((dataCard) => {
          card.likeCardButton(dataCard);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleDeleteCard(cardId) {
      popupDelCard.open();
      popupDelCard.handleFormSubmit(() => {
        popupDelCard.setButtonText("Удаление...");
        api
          .removeCard(cardId)
          .then(() => {
            card.deleteCardButton();
            popupDelCard.close();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            popupDelCard.setButtonText("Да");
          });
      });
    },
  });
  return card.generateCard();
};

const popupAddFormValidator = new FormValidator(validationConfig, popupAddForm);
const popupEditFormValidator = new FormValidator(
  validationConfig,
  popupEditForm
);
const popupAvatarFormValidator = new FormValidator(
  validationConfig,
  popupAvatarForm
);

const handleAddButtonClick = () => {
  popupAdd.open();
  popupAddFormValidator.resetValidation();
};

const handleEditButtonClick = () => {
  popupEditFormValidator.resetValidation();
  const profileInfo = saveInputInfo.getUserInfo();
  popupProfileName.value = profileInfo.name;
  popupProfileJob.value = profileInfo.description;
  popupEdit.open();
};

profileAvatarbutton.addEventListener("click", () => {
  popupEditAvatar.open();
  popupAvatarFormValidator.resetValidation();
});

popupEditButton.addEventListener("click", handleEditButtonClick);
popupAddButton.addEventListener("click", handleAddButtonClick);

popupDelCard.setEventListeners();
popupGallery.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupEditAvatar.setEventListeners();

popupAddFormValidator.enableValidation();
popupEditFormValidator.enableValidation();
popupAvatarFormValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    saveInputInfo.setUserInfo(info);
    userId = info._id;
    cardSection.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.error(err);
  });
