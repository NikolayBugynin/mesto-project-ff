// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// находиим DOM узлы

//находим элемент контейнера с карточками
const placesList = document.querySelector('.places__list');

//темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// Функция создания карточки
function createCard({ name, link, alt }, removeCard) {
  //клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;

  // выберем кнопку удаления и добавим слушателя, чтобы по клику удалять соответствующий элемент
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
      removeCard(cardElement);
    });
  return cardElement;
}

// выводим карточки на страницу
initialCards.forEach((cardElement) => {
  const newCard = createCard(cardElement, removeCard);
  placesList.append(newCard);
});
