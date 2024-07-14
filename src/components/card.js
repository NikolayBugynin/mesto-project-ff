import { removeLike, addLike } from './api';

//Функция получения шаблона карточки cardTemplate
function getCardTemplate() {
  return document.querySelector('#card-template').content;
}

//Функция клонирования шаблона карточки
function getCardElement() {
  //клонируем содержимое тега template
  return cardTemplate.querySelector('.card').cloneNode(true);
}

//темплейт карточки
const cardTemplate = getCardTemplate();

//функция управления лайками
function handleLikeCard(evt, _id, likesNumberElement) {
  if (evt.target.classList.contains('card__like-button_is-active')) {
    removeLike(_id)
      .then((data) => {
        likesNumberElement.textContent = data.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    addLike(_id)
      .then((data) => {
        likesNumberElement.textContent = data.likes.length;
        evt.target.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

// функция создания карточки
function createCard(
  { name, link, likes, owner, _id },
  myID,
  openModalImage,
  popupImage,
  handleLikeCard,
  handleDeleteCard
) {
  //элемент карточки
  const cardElement = getCardElement();

  // наполняем содержимым элемент карточки
  cardElement.querySelector('.card__title').textContent = name;

  //отображение количества лайков карточки
  const likesNumberElement = cardElement.querySelector('.card__likes-counter');
  likesNumberElement.textContent = likes.length;

  //находим элемент изображения и сохраняем в переменную
  const cardImage = cardElement.querySelector('.card__image');

  // наполняем содержимым элемент изображения
  cardImage.src = link;
  cardImage.alt = name;

  // кнопка удаления карточки
  const deleteCardButton = cardElement.querySelector('.card__delete-button');

  //открываем попам подтверждения удаления карточки
  deleteCardButton.addEventListener('click', (evt) =>
    handleDeleteCard(cardElement, _id)
  );

  // прикрепляем обработчик к кнопке открытия попапа просмотра изображения
  cardImage.addEventListener('click', () => {
    openModalImage({ name, link }, popupImage);
  });

  //  сделаем так, чтобы иконка удаления была только на созданных нами карточках
  if (owner._id !== myID) {
    cardElement
      .querySelector('.card__delete-button')
      .classList.add('card__delete-button_is-inactive');
  }

  // проверяем карточки, которые мы лайкнули до перезагрузки
  if (likes.some((elem) => (elem._id === myID) === true)) {
    cardElement
      .querySelector('.card__like-button')
      .classList.add('card__like-button_is-active');
  }

  //кнопка лайка
  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.addEventListener('click', (evt) => {
    handleLikeCard(evt, _id, likesNumberElement);
  });

  //возвращаем подготовленный к выводу элемент карточки
  return cardElement;
}

export { createCard, handleLikeCard };
