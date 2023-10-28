import {NAMES,
  SENTENCES,
  DESCRIPTIONS,
  AVATAR_MIN,
  AVATAR_MAX,
  PHOTO_COUNT,
  LIKES_MIN,
  LIKES_MAX,
  NUM_COMMENTS_MIN,
  NUM_COMMENTS_MAX} from 'js/util.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateComment() {
  const comment = {
    id: getRandomInt(1, 1000), // Генерируем уникальный ID
    avatar: `img/avatar-${getRandomInt(AVATAR_MIN, AVATAR_MAX)}.svg`, // Генерируем случайную аватарку
    message: SENTENCES[getRandomInt(0, SENTENCES.length - 1)], // Выбираем случайное предложение
    name: NAMES[getRandomInt(0, NAMES.length - 1)] // Выбираем случайное имя
  };

  return comment;
}

function generatePhotosArray() {
  const photos = [];

  for (let i = 1; i <= PHOTO_COUNT; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[i],
      likes: getRandomInt(LIKES_MIN, LIKES_MAX),
      comments: []
    };

    const numComments = getRandomInt(NUM_COMMENTS_MIN, NUM_COMMENTS_MAX); // Генерируем случайное количество комментариев

    for (let j = 0; j < numComments; j++) {
      photo.comments.push(generateComment());
    }

    photos.push(photo);
  }

  return Array.from(photos);
}

export {generatePhotosArray};
