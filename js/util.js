function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const onDocumentKeydown = (evt, closingFunc) => {
  if (evt.key === 'Escape') {
    closingFunc(evt);
  }
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInt, onDocumentKeydown, debounce};
