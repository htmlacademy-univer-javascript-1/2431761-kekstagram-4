import {onDocumentKeydown} from '/js/util.js';

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
  document.body.classList.add('modal-open');
  CANCEL.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown(closeOverlay));
  UPLOAD_INPUT.removeEventListener('click', openOverlay);
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
