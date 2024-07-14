import './pages/index.css'; // импорт главного файла стилей
import { createCard, handleLikeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  getInitialCards,
  getUserInfo,
  editUserInfo,
  editAvatar,
  addNewCard,
  deleteCard,
} from './components/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//вызовем функцию, которая найдёт и переберёт все формы на странице:
enableValidation(validationConfig);

// myID
let myID = null;

// переменные для handleDeleteCard, чтобы определить карточку
let currentCard, currentCardId;

//находим элемент контейнера с карточками
const placesList = document.querySelector('.places__list');

//все кнопки закрытия попапов
const closeModalButtons = document.querySelectorAll('.popup__close');

// закрытия попапа по крестику
closeModalButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    closeModal(e.target.closest('.popup'));
  });
});

//кнопка формы редактирвоания профиля
const profileEditButton = document.querySelector('.profile__edit-button');
//кнопка формы добавления новой карточки
const profileAddBButton = document.querySelector('.profile__add-button');
//кнопка формы изменения аватара
const profileAvatar = document.querySelector('.profile__image');

//элемент картинки попапа
const openModalImagelink = document.querySelector('.popup__image');
//подпись элемента картинки попапа
const openModalImageName = document.querySelector('.popup__caption');

//попап для просмотра увеличенного изображения
const popupImage = document.querySelector('.popup_type_image');

//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');

//попап добавления новой карточки на страницу
const popupAddCard = document.querySelector('.popup_type_new-card');

//попап редактирования аватара
const popupAvatar = document.querySelector('.popup_type_avatar');

//попап удаления карточки
const popupDeleteCard = document.querySelector('.popup_type_delete-card');

// выберираем элементы, куда должны быть вставлены значения полученные с сервера
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// прикрепляем обработчик к кнопке открытия попапа редакитрования профиля
profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

// прикрепляем обработчик к кнопке открытия попапа добавления карточки
profileAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  //очищаем форму после открытия
  clearValidation(editAvatarFormElement, validationConfig);
});

profileAddBButton.addEventListener('click', () => {
  openModal(popupAddCard);
  //очищаем форму после открытия
  clearValidation(newPlaceFormElement, validationConfig);
});

// находим форму редактирования профиля в DOM
const editProfileFormElement = document.forms['edit-profile'];

// находим поля редактирования формы профиля в DOM
const profileNameInput = editProfileFormElement.elements.name;
const profileJobInput = editProfileFormElement.elements.description;

//функция уведомления пользователя о процессе загрузки меняя текст на кнопке
function renderLoading(isLoading, button) {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

// Обработчик «отправки» формы
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  const button = popupEditProfile.querySelector('.popup__button');
  renderLoading(true, button);

  //вызываем метод редактирования профиля
  editUserInfo({
    name: profileNameInput.value,
    about: profileJobInput.value,
  })
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, button));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editProfileFormElement.addEventListener('submit', handleEditFormSubmit);

// находим форму добавления карчтоки в DOM
const newPlaceFormElement = document.forms['new-place'];

// находим поля формы добавления карточки в DOM
const placeNameInput = newPlaceFormElement.elements['place-name'];
const placeLinkInput = newPlaceFormElement.elements.link;

// Обработчик «отправки» формы
function handleAddFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  const button = popupAddCard.querySelector('.popup__button');
  renderLoading(true, button);
  //добавляем новую карточку
  addNewCard({
    name: placeNameInput.value,
    link: placeLinkInput.value,
  }) // выводим карточки на страницу
    .then((cardData) => {
      //вставляем карточку в начало
      placesList.prepend(
        createCard(
          cardData,
          myID,
          openModalImage,
          popupImage,
          handleLikeCard,
          handleDeleteCard
        )
      );
      clearValidation(newPlaceFormElement, validationConfig);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, button));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
newPlaceFormElement.addEventListener('submit', handleAddFormSubmit);

const editAvatarFormElement = document.forms['new-avatar'];

const avatarLinkInput = editAvatarFormElement.elements.link;

// Обработчик «отправки» формы
function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  const submitButton = popupAvatar.querySelector('.popup__button');
  renderLoading(true, submitButton);

  // добавляем новую карточку
  editAvatar({
    avatar: avatarLinkInput.value,
  })
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(\'${data.avatar}\')`;
      clearValidation(editAvatarFormElement, validationConfig);
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, submitButton));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editAvatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

const deleteCardFormElement = document.forms['delete-card'];

// функция удаления карточки
function handleDeleteCard(cardElement, _id) {
  openModal(popupDeleteCard);
  currentCardId = _id;
  currentCard = cardElement;
}

// Обработчик «отправки» формы
function handleDeleteCardFormSubmit(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  deleteCard(currentCardId)
    .then(() => {
      currentCard.remove();
      closeModal(popupDeleteCard);
    })
    .catch((err) => console.log(err));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
deleteCardFormElement.addEventListener('submit', handleDeleteCardFormSubmit);

// функция открытия попапа с картинкой
function openModalImage({ link, name }, modal) {
  //наполняем содержимым элемент изображения
  openModalImagelink.src = link;
  openModalImageName.textContent = name;
  openModalImageName.alt = name;

  // открываем попап с картинкой
  openModal(modal);
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsArray]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(\'${userData.avatar}\')`;
    profileAvatar.src = userData.avatar;
    myID = userData._id;
    cardsArray.forEach((cardElement) => {
      const newCard = createCard(
        cardElement,
        myID,
        openModalImage,
        popupImage,
        handleLikeCard,
        handleDeleteCard
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
