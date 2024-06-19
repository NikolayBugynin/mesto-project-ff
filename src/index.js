import './pages/index.css'; // импорт главного файла стилей
import { initialCards } from './components/cards';
import { removeCard, likeCard, createCard } from './components/card';
import { openModal, closeModal } from './components/modal';

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

// выводим карточки на страницу
initialCards.forEach((cardElement) => {
  const newCard = createCard(cardElement, removeCard, openModalImage, likeCard);
  placesList.append(newCard);
});

//кнопка формы редактирвоания профиля
const profileEditButton = document.querySelector('.profile__edit-button');
//кнопка формы добавления новой карточки
const profileAddBButton = document.querySelector('.profile__add-button');

//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_edit');
//попап добавления новой карточки на страницу
const popupAddCard = document.querySelector('.popup_type_new-card');

// выберираем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// прикрепляем обработчик к кнопке открытия попапа редакитрования профиля
profileEditButton.addEventListener('click', () => {
  profileNameInput.value =
    document.querySelector('.profile__title').textContent;
  profileJobInput.value = document.querySelector(
    '.profile__description'
  ).textContent;
  openModal(popupEditProfile);
});

// прикрепляем обработчик к кнопке открытия попапа добавления карточки
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

// Обработчик «отправки» формы, хотя пока
function handleAddFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // Получаем объект новой карточки
  const newCard = createCard(
    {
      name: placeNameInput.value,
      link: placeLinkInput.value,
    },
    removeCard,
    openModalImage,
    likeCard
  );

  //вставляем карточку в начало
  placesList.prepend(newCard);

  //закрываем попап по клику на кнопку сохранить
  closeModal(popupAddCard);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
newPlaceFormElement.addEventListener('submit', handleAddFormSubmit);
