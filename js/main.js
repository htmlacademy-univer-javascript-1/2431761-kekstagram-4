function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateComment() {
  const names = ['Михаил',
    'Денис',
    'Ярослав',
    'Ирина',
    'Макар',
    'Амина',
    'Василиса',
    'Данил',
    'Андрей',
    'Дмитрий',
    'Аделина',
    'София',
    'Роман',
    'Артемий',
    'Виктория',
    'Тимофей',
    'Артём',
    'Евгения',
    'Милана',
    'Анна',];

  const sentences = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const comment = {
    id: getRandomInt(1, 1000), // Генерируем уникальный ID
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`, // Генерируем случайную аватарку
    message: sentences[getRandomInt(0, sentences.length - 1)], // Выбираем случайное предложение
    name: names[getRandomInt(0, names.length - 1)] // Выбираем случайное имя
  };

  return comment;
}

function generatePhotosArray() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии ${i}`,
      likes: getRandomInt(15, 200),
      comments: []
    };

    const numComments = getRandomInt(0, 30); // Генерируем случайное количество комментариев

    for (let j = 0; j < numComments; j++) {
      photo.comments.push(generateComment());
    }

    photos.push(photo);
  }

  return photos;
}

const photosArray = generatePhotosArray();

console.log(photosArray);
