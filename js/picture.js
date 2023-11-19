import { generatePhotosArray } from 'js/data.js';

const photosArray = generatePhotosArray();

function renderPicture(photo) {
  const pictureTemplate = document.querySelector('#picture').content.cloneNode(true);
  const pictureElement = pictureTemplate.querySelector('.picture');

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
}

function renderPictures(photos) {
  const fragment = document.createDocumentFragment();
  const picturesContainer = document.querySelector('.pictures');

  photos.forEach((photo) => {
    const picture = renderPicture(photo);
    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
}

export {renderPictures};
