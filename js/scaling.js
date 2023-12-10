const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

let scaleValue = SCALE_MAX;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

scaleControlSmaller.addEventListener('click', () => {
  if (scaleValue > SCALE_MIN) {
    scaleValue -= SCALE_STEP;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (scaleValue < SCALE_MAX) {
    scaleValue += SCALE_STEP;
    updateScale();
  }
});

function updateScale() {
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
}

export {updateScale};
