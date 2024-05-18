// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// находиим DOM узлы

//находим элемент контейнера с карточками
const placesList = document.querySelector('.places__list');

//темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//находим карточку по селектору
const card = document.querySelector('.card');

function removeCard(event) {
  // выберем кнопку удаления
  const deleteElement = event.target.closest('.card');
  //удаляем карточку
  deleteElement.remove();
}

// Функция создания карточки
function createCard({ name, link }, removeCard) {
  //клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;

  // выберем кнопку удаления и добвляем слушателя на кнопку 'корзины'

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', removeCard);
  return cardElement;
}

// выводим карточки на страницу
initialCards.forEach((cardElement) => {
  const newCard = createCard(cardElement, removeCard);
  placesList.append(newCard);
});


// вствляем год в footer

//Creating Date Objects
const date = new Date();

// извлекаем год
const year = date.getFullYear();

// находим span в footer c годом
const footerYear = document.querySelector('.footer__year');

//встявляем значение
footerYear.textContent = date.getFullYear();
