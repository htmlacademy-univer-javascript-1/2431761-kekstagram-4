import { fetchPhotos } from '/js/data.js';
import { openFullScreen } from '/js/fullscreen.js';
import { debounce } from '/js/util.js';

const PHOTOS_DERCEASE = 0.5;
const FIRST_PHOTO = 0;
const LAST_PHOTO = 10;

const picTemp = document.querySelector('#picture').content.querySelector('.picture');
const picContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

function createPictureElement(photo) {
  const pictureElement = picTemp.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  pictureElement.addEventListener('click', () => openFullScreen(photo));

  return pictureElement;
}

function applyFilter(filter, photos) {
  switch (filter) {
    case 'filter-random':
      return photos.slice().sort(() => Math.random() - PHOTOS_DERCEASE).slice(FIRST_PHOTO, LAST_PHOTO);
    case 'filter-discussed':
      return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
    default:
      return photos.slice();
  }
}

const debouncedUpdatePictures = debounce((photos) => {
  // Очищаем контейнер с фотографиями
  const pictures = picContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });

  // Рендерим отфильтрованные фотографии
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(createPictureElement(photo));
  });
  picContainer.appendChild(fragment);
});

imgFilters.addEventListener('click', (evt) => {
  const target = evt.target;
  if (target.tagName === 'BUTTON') {
    const activeButton = imgFilters.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');

    renderPictures().then((photosArray) => {
      const filteredPhotos = applyFilter(target.id, photosArray);
      debouncedUpdatePictures(filteredPhotos);
    });
  }
});

function renderPictures() {
  return new Promise((resolve) => {
    fetchPhotos().then((photosArray) => {
      const fragment = document.createDocumentFragment();

      photosArray.forEach((photo) => {
        fragment.appendChild(createPictureElement(photo));
      });

      picContainer.appendChild(fragment);

      imgFilters.classList.remove('img-filters--inactive');
      resolve(photosArray);
    });
  });
}

export { renderPictures };
