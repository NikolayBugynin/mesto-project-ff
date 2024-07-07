import './pages/index.css'; // импорт главного файла стилей
import { createCard, removeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, validationConfig } from './components/validation';
import {
  getInitialCards,
  getUserInfo,
  editUserInfo,
  addNewCard,
  deleteCard,
  like,
  dislike,
  editAvatar,
} from './components/api.js';

//находим элемент контейнера с карточками
export const placesList = document.querySelector('.places__list');

//все кнопки закрытия попапов
const closeModalButtons = document.querySelectorAll('.popup__close');

//элемент картинки попапа
const openModalImagelink = document.querySelector('.popup__image');
//подпись элемента картинки попапа
const openModalImageName = document.querySelector('.popup__caption');

// закрытия попапа по крестику
closeModalButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    closeModal(e.target.closest('.popup'));
  });
});

// функция открытия попапа с картинкой
function openModalImage({ link, name }, modal) {
  //наполняем содержимым элемент изображения
  openModalImagelink.src = link;
  openModalImageName.textContent = name;
  openModalImageName.alt = name;

  // открываем попап с картинкой
  openModal(modal);
}

//кнопка формы редактирвоания профиля
const profileEditButton = document.querySelector('.profile__edit-button');
//кнопка формы добавления новой карточки
const profileAddBButton = document.querySelector('.profile__add-button');
//кнопка формы изменения аватара
const profileAvatar = document.querySelector('.profile__image');

//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
//попап добавления новой карточки на страницу
const popupAddCard = document.querySelector('.popup_type_new-card');
//попап редактирования аватара
const popupAvatar = document.querySelector('.popup_type_avatar');

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
  //очищаем форму после закрытия
  editAvatarFormElement.reset();
});

profileAddBButton.addEventListener('click', () => {
  openModal(popupAddCard);
  //очищаем форму после закрытия
  newPlaceFormElement.reset();
});

// находим форму редактирования профиля в DOM
const editProfileFormElement = document.forms['edit-profile'];

// находим поля редактирования формы профиля в DOM
const profileNameInput = editProfileFormElement.elements.name;
const profileJobInput = editProfileFormElement.elements.description;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // получаем значение полей jobInput и nameInput из свойства value
  const profileNameInputValue = profileNameInput.value;
  const profileJobInputValue = profileJobInput.value;

  //вызываем метод редактирования профиля
  editUserInfo({
    name: profileNameInputValue,
    about: profileJobInputValue,
  })
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });

  // вставляем новые значения с помощью textContent
  profileTitle.textContent = profileNameInputValue;
  profileDescription.textContent = profileJobInputValue;

  //закрываем попап по клику на кнопку сохранить
  closeModal(popupEditProfile);
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
          removeCard,
          openModalImage,
          like,
          dislike,
          deleteCard
        )
      );
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });

  //закрываем попап по клику на кнопку сохранить
  closeModal(popupAddCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
newPlaceFormElement.addEventListener('submit', handleAddFormSubmit);

const editAvatarFormElement = document.forms['new-avatar'];

const avatarLinkInput = editAvatarFormElement.elements.link;

function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // добавляем новую карточку
  editAvatar({
    avatar: avatarLinkInput.value,
  })
    .then((data) => {
      console.log(data);
      profileAvatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });

  //закрываем попап по клику на кнопку сохранить
  closeModal(popupAvatar);
}

editAvatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(validationConfig);

// выводим карточки на страницу
getInitialCards()
  .then((cards) => {
    cards.forEach((cardElement) => {
      const newCard = createCard(
        cardElement,
        removeCard,
        openModalImage,
        like,
        dislike,
        deleteCard
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

getUserInfo()
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
