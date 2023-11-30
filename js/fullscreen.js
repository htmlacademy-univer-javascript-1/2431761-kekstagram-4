const BODY = document.querySelector('body');
const BIG_PICTURE = document.querySelector('.big-picture');
const BIG_PICTURE_IMG = BIG_PICTURE.querySelector('.big-picture__img');
const LIKES_COINT = BIG_PICTURE.querySelector('.likes-count');
const COMMENTS_COINT = BIG_PICTURE.querySelector('.comments-count');
const SOCIAL_COMMENTS = BIG_PICTURE.querySelector('.social__comments');
const SOCIAL_CAPTION = BIG_PICTURE.querySelector('.social__caption');
const COMMENTS_COUNT = 5;
let currentCommentsCount = 0;
let comments = [];

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
  comments = photo.comments;
  currentCommentsCount = Math.min(COMMENTS_COUNT, comments.length);
  renderComments();

  document.querySelector('.comments-loader').addEventListener('click', loadMoreComments);
}

function closeFullScreen() {
  BODY.classList.remove('modal-open');
  BIG_PICTURE.classList.add('hidden');

  document.removeEventListener('keydown', onEscPress);
  document.querySelector('.big-picture__cancel').removeEventListener('click', closeFullScreen);
  document.querySelector('.comments-loader').removeEventListener('click', loadMoreComments);
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeFullScreen();
  }
}

function renderComments() {
  clearComments();
  const fragment = document.createDocumentFragment();

  comments.slice(0, currentCommentsCount).forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  SOCIAL_COMMENTS.appendChild(fragment);

  if (currentCommentsCount >= comments.length) {
    document.querySelector('.comments-loader').classList.add('hidden');
  } else {
    document.querySelector('.comments-loader').classList.remove('hidden');
  }

  document.querySelector('.social__comment-count').textContent = `${currentCommentsCount} из ${comments.length} комментариев`;}

function loadMoreComments() {
  const remainingComments = comments.length - currentCommentsCount;
  currentCommentsCount += Math.min(COMMENTS_COUNT, remainingComments);
  renderComments();
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
