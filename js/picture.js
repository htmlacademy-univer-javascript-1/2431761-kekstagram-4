// picture.js
import { generatePhotosArray } from 'js/data.js';

const photosArray = generatePhotosArray();

function createPictureElement(photo) {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureElement = pictureTemplate.cloneNode(true);

  const imgElement = pictureElement.querySelector('.picture__img');
  const likesElement = pictureElement.querySelector('.picture__likes');
  const commentsElement = pictureElement.querySelector('.picture__comments');

  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  likesElement.textContent = photo.likes;
  commentsElement.textContent = photo.comments.length;

  return pictureElement;
}

export function renderPictures() {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
