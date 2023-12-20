const UPDATE_DELAY = 500;

const onDocumentKeydown = (evt, closingFunc) => {
  if (evt.key === 'Escape') {
    closingFunc(evt);
  }
};

function debounce(callback, timeoutDelay = UPDATE_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {onDocumentKeydown, debounce};
