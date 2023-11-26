const BODY = document.querySelector('body');
const BIG_PICTURE = document.querySelector('.big-picture');
const BIG_PICTURE_IMG = BIG_PICTURE.querySelector('.big-picture__img');
const LIKES_COINT = BIG_PICTURE.querySelector('.likes-count');
const COMMENTS_COINT = BIG_PICTURE.querySelector('.comments-count');
const SOCIAL_COMMENTS = BIG_PICTURE.querySelector('.social__comments');
const SOCIAL_CAPTION = BIG_PICTURE.querySelector('.social__caption');

function openFullScreen(photo) {
  BODY.classList.add('modal-open');
  BIG_PICTURE.classList.remove('hidden');

  BIG_PICTURE_IMG.src = photo.url;
  LIKES_COINT.textContent = photo.likes;
  COMMENTS_COINT.textContent = photo.comments.length;
  SOCIAL_CAPTION.textContent = photo.description;

  renderComments(photo.comments);

  document.addEventListener('keydown', onEscPress);
  document.querySelector('.big-picture__cancel').addEventListener('click', closeFullScreen);
}

function closeFullScreen() {
  BODY.classList.remove('modal-open');
  BIG_PICTURE.classList.add('hidden');

  document.removeEventListener('keydown', onEscPress);
  document.querySelector('.big-picture__cancel').removeEventListener('click', closeFullScreen);
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeFullScreen();
  }
}

function renderComments(comments) {
  clearComments();
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  SOCIAL_COMMENTS.appendChild(fragment);
}

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(imgElement);
  commentElement.appendChild(textElement);

  return commentElement;
}

function clearComments() {
  SOCIAL_COMMENTS.innerHTML = '';
}

export {openFullScreen, closeFullScreen};
