import ColorVariant from "./scripts/colorVariant";

console.log('Hello World');

(function () {
  const colorVariantForm = document.querySelector('#color-variant-form');
  const result = document.querySelector('#result');

  colorVariantForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const hexInput = event.target.querySelector('#hex');
    const rgbInput = event.target.querySelector('#rgb');
    const variantInput = event.target.querySelector('#variant');

    let _text = '';

    if (hexInput.value.length) {
      console.log('hexInput.value', hexInput.value);
      _text = ColorVariant.getToRGBA(hexInput.value);;
    };

    if (rgbInput.value.length) {
      console.log('rgbInput.value', rgbInput.value);
      _text = ColorVariant.getToHex(rgbInput.value);
    };
    
    result.insertAdjacentHTML('beforeend', `<div style="width: 300px; height: 300px; background-color: ${ _text }"></div> <p>${_text}</p>`) ;
  });
})();