const COMMENTS_COUNT = 5;
const IMG_SIDES = 35;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

let currentCommentsCount = 0;
let comments = [];

function openFullScreen(photo) {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  renderComments(photo.comments);

  document.addEventListener('keydown', onEscPress);
  document.querySelector('.big-picture__cancel').addEventListener('click', closeFullScreen);
  comments = photo.comments;
  currentCommentsCount = Math.min(COMMENTS_COUNT, comments.length);
  renderComments();

  document.querySelector('.comments-loader').addEventListener('click', loadMoreComments);
}

function closeFullScreen() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

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

  socialComments.appendChild(fragment);

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
  imgElement.width = IMG_SIDES;
  imgElement.height = IMG_SIDES;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(imgElement);
  commentElement.appendChild(textElement);

  return commentElement;
}

function clearComments() {
  socialComments.innerHTML = '';
}

export {openFullScreen, closeFullScreen};
