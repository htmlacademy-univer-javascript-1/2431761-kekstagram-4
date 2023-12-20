import {onDocumentKeydown} from '/js/util.js';
import {applyEffect, resetEffect} from '/js/effects.js';
import {updateScale} from '/js/scaling.js';
import {fileChooser, preview} from '/js/upload.js';

const MAX_HASHTAGS = 5;
const DESC_LENGTH = 140;
const UPLOAD_FORM = document.querySelector('.img-upload__form');
const UPLOAD_INPUT = UPLOAD_FORM.querySelector('.img-upload__input');
const OVERLAY = UPLOAD_FORM.querySelector('.img-upload__overlay.hidden');
const CANCEL = UPLOAD_FORM.querySelector('.img-upload__cancel');
const HASHTAGS = UPLOAD_FORM.querySelector('.text__hashtags');
const DESCRIPTION = UPLOAD_FORM.querySelector('.text__description');
const SUBMIT = UPLOAD_FORM.querySelector('#upload-submit');
const VALIDATION = /^#[0-9a-zа-яё]{1,19}$/i;

const PRISTINE = new Pristine(UPLOAD_FORM, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const checkCountOfHashtags = (value) => value.trim().split(' ').length <= MAX_HASHTAGS;

const checkHashtagsUniqueness = (value) => {
  const hashtags = value.split(' ');
  const hashTagMap = {};
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
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
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; ++i) {
    if (!VALIDATION.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

PRISTINE.addValidator(
  HASHTAGS,
  checkCountOfHashtags,
  'Количество хэштегов не может превышать 5'
);

PRISTINE.addValidator(
  HASHTAGS,
  checkHashtagsUniqueness,
  'Не должно быть повторяющихся хэштегов'
);

PRISTINE.addValidator(
  HASHTAGS,
  checkHashtages,
  'Неверное содержание хештега'
);

const checkDescription = (value) => value.trim().length <= DESC_LENGTH;

PRISTINE.addValidator(
  DESCRIPTION,
  checkDescription,
  'Описание не может быть больше 140 символов'
);

function closeOverlay(){
  OVERLAY.classList.add('hidden');
  resetEffect();
  updateScale();
  document.body.classList.remove('modal-open');
  CANCEL.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown(closeOverlay));
  UPLOAD_INPUT.addEventListener('click', openOverlay);
  UPLOAD_INPUT.value = null;
  HASHTAGS.textContent = '';
  DESCRIPTION.textContent = '';
}

function openOverlay() {
  OVERLAY.classList.remove('hidden');
  applyEffect();
  document.body.classList.add('modal-open');
  CANCEL.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown(closeOverlay));
  UPLOAD_INPUT.removeEventListener('click', openOverlay);

  // Если пользователь выбрал файл, отобразить его в предварительном просмотре
  if (fileChooser.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(fileChooser.files[0]);
  }
}

UPLOAD_INPUT.addEventListener('change', openOverlay);

HASHTAGS.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = PRISTINE.validate();
  if (!isValid) {
    SUBMIT.setAttribute('disabled', true);
  }
  else{
    SUBMIT.removeAttribute('disabled');
  }
});

DESCRIPTION.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = PRISTINE.validate();
  if (!isValid) {
    SUBMIT.setAttribute('disabled', true);
  }
  else{
    SUBMIT.removeAttribute('disabled');
  }
});

UPLOAD_FORM.addEventListener('submit', (evt) => {
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
      SUBMIT.removeAttribute('disabled');
    });
});

function resetForm() {
  // Сброс масштаба
  updateScale();

  // Сброс эффекта
  resetEffect();

  // Очистка полей для ввода хэш-тегов и комментария
  HASHTAGS.value = '';
  DESCRIPTION.value = '';

  // Очистка поля загрузки фотографии
  UPLOAD_INPUT.value = '';
}

// Обработчик кнопки сброса
const resetButton = UPLOAD_FORM.querySelector('.img-upload__cancel');
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
CANCEL.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeOverlay();
  resetForm();
});
