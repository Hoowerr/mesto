const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__closed");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupNameInput = document.getElementById("name");
const popupJobInput = document.getElementById("job");
const popupForm = document.querySelector(".popup__form");
// const likeButtons = document.querySelectorAll(".element__like-button");

function openPopup() {
  popup.classList.add("popup_opened");
  popupNameInput.value = profileTitle.textContent;
  popupJobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function save(event) {
  event.preventDefault();
  profileTitle.textContent = popupNameInput.value;
  profileSubtitle.textContent = popupJobInput.value;
  closePopup();
}

// function like(event) {
//   event.target.classList.toggle("element__like-button_active");
// }

popupForm.addEventListener("submit", save);
popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
// likeButtons.forEach((button) => button.addEventListener("click", like));
