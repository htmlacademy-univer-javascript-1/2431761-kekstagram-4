import {generatePhotosArray} from 'js/data.js';
import {renderPictures} from 'js/picture.js';
renderPictures();

const photosArray = generatePhotosArray();
renderPictures(photosArray);
