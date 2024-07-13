// функция окрытия попапа
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeModalByEsc);
  document.addEventListener('mouseup', closeModalOnOverlay);
}

// функция закрытия попапа
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalByEsc);
  document.removeEventListener('mouseup', closeModalOnOverlay);
}

//элемент картинки попапа
const openModalImagelink = document.querySelector('.popup__image');
//подпись элемента картинки попапа
const openModalImageName = document.querySelector('.popup__caption');

// функция открытия попапа с картинкой
function openModalImage({ link, name }, modal) {
  //наполняем содержимым элемент изображения
  openModalImagelink.src = link;
  openModalImageName.textContent = name;
  openModalImageName.alt = name;

  // открываем попап с картинкой
  openModal(modal);
}

// функция закрытия попапа сликом на оверлей
function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// функция закрытия попапа нажатием на Esc
function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export {
  openModal,
  closeModal,
  openModalImage,
  closeModalOnOverlay,
  closeModalByEsc,
};
