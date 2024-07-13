export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: 'e5903adb-1bb2-4a6a-98ba-e42c06210ac4',
    'Content-Type': 'application/json',
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

//загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

// загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

// редактирование профиля
export const editUserInfo = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(profileData),
  }).then(handleResponse);
};

// добавление карточки
export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then(handleResponse);
};

//удаление карточки
export const deleteCard = (_id) => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify(),
  }).then(handleResponse);
};

export const addLike = (_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify(),
  }).then(handleResponse);
};

export const removeLike = (_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify(),
  }).then(handleResponse);
};

// редактирование аватара
export const editAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
};
