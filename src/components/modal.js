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

// функция закрытия попапа сликом на оверлей
function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
  }
}

// функция закрытия попапа нажатием на Esc
function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');
    if (openedPopup) {
    }
  }
}

// функция открытия попапа с картинкой
function openModalImage({ name, link }, modal) {
  //наполняем содержимым элемент изображения
  const openModalImagelink = document.querySelector('.popup__image');
  openModalImagelink.src = link;
  const openModalImagename = document.querySelector('.popup__caption');
  openModalImagename.textContent = name;
  // открываем попап с картинкой
  openModal(modal);
}

export {
  openModal,
  closeModal,
  closeModalOnOverlay,
  closeModalByEsc,
  openModalImage,
};
