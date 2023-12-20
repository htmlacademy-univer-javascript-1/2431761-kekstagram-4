import {onDocumentKeydown} from '/js/util.js';
import {applyEffect, resetEffect} from '/js/effects.js';
import {updateScale} from '/js/scaling.js';
import {fileChooser, preview} from '/js/upload.js';

const MAX_HASHTAGS = 5;
const DESC_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const overlay = uploadForm.querySelector('.img-upload__overlay.hidden');
const cancel = uploadForm.querySelector('.img-upload__cancel');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');
const submit = uploadForm.querySelector('#upload-submit');
const validation = /^#[0-9a-zа-яё]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const checkCountOfHashtags = (value) => value.trim().split(' ').length <= MAX_HASHTAGS;

const checkHashtagsUniqueness = (value) => {
  const hashtagsList = value.split(' ');
  const hashTagMap = {};
  for (let i = 0; i < hashtagsList.length; i++) {
    const hashtag = hashtagsList[i];
    if (hashtag in hashTagMap) {
      return false;
    }
    hashTagMap[hashtag] = true;
  }
  return true;
};

const checkHashtages = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtagsList = value.trim().split(' ');
  for (let i = 0; i < hashtagsList.length; ++i) {
    if (!validation.test(hashtagsList[i])) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(
  hashtags,
  checkCountOfHashtags,
  'Количество хэштегов не может превышать 5'
);

pristine.addValidator(
  hashtags,
  checkHashtagsUniqueness,
  'Не должно быть повторяющихся хэштегов'
);

pristine.addValidator(
  hashtags,
  checkHashtages,
  'Неверное содержание хештега'
);

const checkDescription = (value) => value.trim().length <= DESC_LENGTH;

pristine.addValidator(
  description,
  checkDescription,
  'Описание не может быть больше 140 символов'
);

function closeOverlay(){
  overlay.classList.add('hidden');
  resetEffect();
  updateScale();
  document.body.classList.remove('modal-open');
  cancel.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown(closeOverlay));
  uploadInput.addEventListener('click', openOverlay);
  uploadInput.value = null;
  hashtags.textContent = '';
  description.textContent = '';
}

function openOverlay() {
  overlay.classList.remove('hidden');
  applyEffect();
  document.body.classList.add('modal-open');
  cancel.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown(closeOverlay));
  uploadInput.removeEventListener('click', openOverlay);

  // Если пользователь выбрал файл, отобразить его в предварительном просмотре
  if (fileChooser.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(fileChooser.files[0]);
  }
}

uploadInput.addEventListener('change', openOverlay);

hashtags.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submit.setAttribute('disabled', true);
  }
  else{
    submit.removeAttribute('disabled');
  }
});

description.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submit.setAttribute('disabled', true);
  }
  else{
    submit.removeAttribute('disabled');
  }
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch('https://29.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка отправки данных: ${response.status}`);
      }
      // Обработка успешной отправки данных
      closeOverlay(); // Закрытие формы
      resetForm(); // Сброс формы
      showSuccessMessage(); // Показ сообщения об успехе
    })
    .catch((error) => {
    // Обработка ошибки отправки данных
      showErrorMessage(`Произошла ошибка при отправке данных: ${error.message}`);
    })
    .finally(() => {
    // Разблокировка кнопки "Отправить"
      submit.removeAttribute('disabled');
    });
});

function resetForm() {
  // Сброс масштаба
  updateScale();

  // Сброс эффекта
  resetEffect();

  // Очистка полей для ввода хэш-тегов и комментария
  hashtags.value = '';
  description.value = '';

  // Очистка поля загрузки фотографии
  uploadInput.value = '';
}

// Обработчик кнопки сброса
const resetButton = uploadForm.querySelector('.img-upload__cancel');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

function showSuccessMessage() {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);

  // Закрытие сообщения об успехе по нажатию на кнопку, клавишу Esc или клику вне блока с сообщением
  const successButton = successElement.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  });
  successElement.addEventListener('click', (evt) => {
    if (evt.target === successElement) {
      closeSuccessMessage();
    }
  });
}

function closeSuccessMessage() {
  const successElement = document.querySelector('.success');
  document.body.removeChild(successElement);
}

function showErrorMessage(message) {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  const errorMessage = errorElement.querySelector('.error__message');
  errorMessage.textContent = message;
  document.body.appendChild(errorElement);

  // Закрытие сообщения об ошибке по нажатию на кнопку, клавишу Esc или клику вне блока с сообщением
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  });
  errorElement.addEventListener('click', (evt) => {
    if (evt.target === errorElement) {
      closeErrorMessage();
    }
  });
}

function closeErrorMessage() {
  const errorElement = document.querySelector('.error');
  document.body.removeChild(errorElement);
}

// Обработчик закрытия формы
cancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeOverlay();
  resetForm();
});
