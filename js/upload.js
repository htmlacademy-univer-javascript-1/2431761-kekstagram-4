const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Находим поле ввода файла и элемент изображения
const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  // Проверяем, что выбранный файл является изображением
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // После загрузки файла, устанавливаем его как изображение предварительного просмотра
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

export { fileChooser, preview };
