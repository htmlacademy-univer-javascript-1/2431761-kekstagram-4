import {getRandomInt} from "js/util.js";

const NAMES = ['Михаил',
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

const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Ласковый закат над океаном',
  'Расцветающее поле маков',
  'Мост через горную реку',
  'Дети, играющие в водных брызгах на пляже',
  'Заколдованный лес в тумане',
  'Огоньки городской ночи',
  'Разноцветные воздушные шары на фестивале',
  'Виноградная лоза в солнечном саду',
  'Заброшенное здание с граффити',
  'Водопад в горах',
  'Рыцарь в доспехах, стоящий на вершине холма',
  'Золотой осенний лес',
  'Рыбаки на рассвете на озере',
  'Парижская улица с кафе',
  'Цветущие сакуры в японском саду',
  'Ретро автомобиль на улицах Гаваны',
  'Поля ветряных мельниц в Голландии',
  'Летящий воздушный шар над горами',
  'Котенок, играющий с шершавым камнем на пляже',
  'Девушка с красными воздушными шарами на улице',
  'Раскрытая книга на деревянной скамейке в парке',
  'Абстрактное отражение небоскребов в стеклянной фасаде',
  'Семья, смотрящая на закат с пикника',
  'Колесо обозрения над ночным городом',
  'Рабочий на стройке, с отдыхающим веслом на плече',
];

const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

const PHOTO_COUNT = 25;

const LIKES_MIN = 15;
const LIKES_MAX = 200;

const NUM_COMMENTS_MIN = 0;
const NUM_COMMENTS_MAX = 30;

export {NAMES,
  SENTENCES,
  DESCRIPTIONS,
  AVATAR_MIN,
  AVATAR_MAX,
  PHOTO_COUNT,
  LIKES_MIN,
  LIKES_MAX,
  NUM_COMMENTS_MIN,
  NUM_COMMENTS_MAX};

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
