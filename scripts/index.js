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
function createCard({ name, link }, removeCard) {
  //клонируем содержимое тега template и и сохраняем в переменную элемента карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем содержимым элемент карточки
  cardElement.querySelector('.card__title').textContent = name;

  //находим элемент изображения и сохраняем в переменную
  const сardImage = cardElement.querySelector('.card__image');

  // наполняем содержимым элемент изображения
  сardImage.src = link;
  сardImage.alt = name;

  // выберем кнопку удаления и добавим слушателя, чтобы по клику удалять соответствующий элемент
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
      removeCard(cardElement);
    });

  //возвращаем подготовленный к выводу элемент карточки
  return cardElement;
}

// выводим карточки на страницу
initialCards.forEach((cardElement) => {
  const newCard = createCard(cardElement, removeCard);
  placesList.append(newCard);
});
