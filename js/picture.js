import {generatePhotosArray} from '/js/data.js';
import {openFullScreen} from '/js/fullScreen.js';

const PIC_TEMP = document.querySelector('#picture').content.querySelector('.picture');
const PIC_CONTAINER = document.querySelector('.pictures');

function createPictureElement(photo) {
  const pictureElement = PIC_TEMP.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureElement.addEventListener('click', () => openFullScreen(photo));

  return pictureElement;
}

function renderPictures() {
  const photosArray = generatePhotosArray();
  const fragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
    fragment.appendChild(createPictureElement(photo));
  });

  PIC_CONTAINER.appendChild(fragment);
}

export {renderPictures};
