function fetchPhotos() {
  return fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки данных: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      showError(error.message);
    });
}

function showError(message) {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  const errorMessage = errorElement.querySelector('.error__message');
  errorMessage.textContent = message;
  document.body.appendChild(errorElement);
}

export {fetchPhotos, showError};
