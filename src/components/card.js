//Функция получения шаблона карточки cardTemplate
function getCardTemplate() {
  return document.querySelector('#card-template').content;
}

//темплейт карточки
const cardTemplate = getCardTemplate();

//Функция клонирования шаблона карточки
function getCardElement() {
  //клонируем содержимое тега template
  return cardTemplate.querySelector('.card').cloneNode(true);
}

//попап для просмотра увеличенного изображения
const popupImage = document.querySelector('.popup_type_image');

//функция удаления карточки
function removeCard(card) {
  card.remove();
}

//функция лайка карточки
function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

// функция создания карточки
function createCard({ name, link }, removeCard, openModalImage, likeCard) {
  //элемент карточки
  const cardElement = getCardElement();

  // наполняем содержимым элемент карточки
  cardElement.querySelector('.card__title').textContent = name;

  //находим элемент изображения и сохраняем в переменную
  const cardImage = cardElement.querySelector('.card__image');

  // наполняем содержимым элемент изображения
  cardImage.src = link;
  cardImage.alt = name;

  // выберем кнопку удаления и добавим слушателя, чтобы по клику удалять соответствующий элемент
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
      removeCard(cardElement);
    });

  // прикрепляем обработчик к кнопке открытия попапа просмотра изображения
  cardImage.addEventListener('click', () => {
    openModalImage({ name, link }, popupImage);
  });

  //находим родителя всех элементов с сердечком
  const likesContainer = cardElement.querySelector('.card__description');

  // используя делегирование, прикрепляем обработчик на родителя элементов с сердечком,
  likesContainer.addEventListener('click', (evt) => {
    likeCard(evt);
  });

  //возвращаем подготовленный к выводу элемент карточки
  return cardElement;
}

export { removeCard, likeCard, createCard };
