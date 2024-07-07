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

//попап для просмотра увеличенного изображения
const popupImage = document.querySelector('.popup_type_image');

//функция лайка карточки

export function removeCard(card) {
  card.remove();
}

// функция создания карточки
export function createCard(
  { name, link, likes, owner, _id },
  removeCard,
  openModalImage,
  like,
  dislike,
  deleteCard,
  handleLikeCard,
  isLiked
) {
  //элемент карточки
  const cardElement = getCardElement();

  // наполняем содержимым элемент карточки
  cardElement.querySelector('.card__title').textContent = name;

  //отображение количества лайков карточки
  cardElement.querySelector('.card__likes-counter').textContent = likes.length;

  //находим элемент изображения и сохраняем в переменную
  const cardImage = cardElement.querySelector('.card__image');

  // наполняем содержимым элемент изображения
  cardImage.src = link;
  cardImage.alt = name;

  // выберем кнопку удаления и добавим слушателя, чтобы по клику удалять соответствующий элемент
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
      deleteCard(_id)
        .then(() => {
          removeCard(cardElement);
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    });

  // console.log(likes);

  // прикрепляем обработчик к кнопке открытия попапа просмотра изображения
  cardImage.addEventListener('click', () => {
    openModalImage({ name, link }, popupImage);
  });

  //находим родителя всех элементов с сердечком
  const likesContainer = cardElement.querySelector('.card__description');

  //  сделаем так, чтобы лайк стоял на тех карточках, что мы лайнули при перезагразке
  function checkLike() {
    return likes.some((elem) => elem._id === '244c57b36a82ccd387eecd96');
  }



  console.log(checkLike());

  function handleLikeCard(evt) {
    if (checkLike() === false) { 
      evt.target.classList.add('card__like-button_is-active');
      likes.length = likes.length +1;
      like(_id)
        .then(() => {})
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    } else {
      evt.target.classList.add('card__like-button_is-active');
      dislike(_id)
        .then(() => {})
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
  }

  //снимаем лайк
  likesContainer.addEventListener('click', (evt) => {
    handleLikeCard(evt);
  });

  let myID = '244c57b36a82ccd387eecd96';

  //  сделаем так, чтобы иконка удаления была только на созданных нами карточках
  function showDeleteButtton() {
    if (myID !== owner._id) {
      cardElement
        .querySelector('.card__delete-button')
        .classList.add('card__delete-button_is-inactive');
    }
  }
  // и вызовем ее
  showDeleteButtton();

  // function isLiked() {
  //   if (likes.some((elem) => elem._id === '244c57b36a82ccd387eecd96')) {
  //     cardElement
  //       .querySelector('.card__like-button')
  //       .classList.add('card__like-button_is-active');
  //   }
  // }
  // isLiked();

  //возвращаем подготовленный к выводу элемент карточки
  return cardElement;
}
