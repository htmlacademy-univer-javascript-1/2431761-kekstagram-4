function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const onDocumentKeydown = (evt, closingFunc) => {
  if (evt.key === 'Escape') {
    closingFunc(evt);
  }
};

export {getRandomInt, onDocumentKeydown};
