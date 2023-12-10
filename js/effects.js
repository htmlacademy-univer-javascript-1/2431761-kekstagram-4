const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelectorAll('.effects__radio');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectLevel = document.querySelector('.img-upload__effect-level');

noUiSlider.create(effectLevelSlider, {
  start: 100,
  range: {
    min: 0,
    max: 100
  }
});

effectLevelSlider.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevelValue.value = unencoded[handle];
  applyEffect();
});

effectsRadio.forEach((effect) => {
  effect.addEventListener('change', () => {
    effectLevelSlider.noUiSlider.set(100);
    applyEffect();
  });
});

function applyEffect() {
  const effect = document.querySelector('.effects__radio:checked').value;
  const value = effectLevelValue.value;

  switch (effect) {
    case 'chrome':
      imgUploadPreview.style.filter = `grayscale(${value / 100})`;
      break;
    case 'sepia':
      imgUploadPreview.style.filter = `sepia(${value / 100})`;
      break;
    case 'marvin':
      imgUploadPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgUploadPreview.style.filter = `blur(${value * 3 / 100}px)`;
      break;
    case 'heat':
      imgUploadPreview.style.filter = `brightness(${value * 2 / 100 + 1})`;
      break;
    default:
      imgUploadPreview.style.filter = 'none';
  }
}

function resetEffect() {
  // Сбрасываем эффект на "Оригинал"
  imgUploadPreview.style.filter = 'none';
}

effectsRadio.forEach((effect) => {
  effect.addEventListener('change', () => {
    effectLevelSlider.noUiSlider.set(100);
    if (effect.value === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
    applyEffect();
  });
});

export {applyEffect, resetEffect};
