import noUiSlider from 'nouislider';
import wNumb from 'wnumb'

$(() => {
  const rangeParent = $('[data-range-block]')

  if (rangeParent.length) {

    rangeParent.each(function() {
      const rangeSlider = $(this).find('.range__range');
      const inputStart = $(this).find('[data-input-start]');
      const inputEnd = $(this).find('[data-input-end]');

      const inputStartValue = inputStart.attr('data-input-start');
      const inputEndValue = inputEnd.attr('data-input-end');
      
      const rangeMin = Number(rangeSlider.attr('data-range-min'));
      const rangeMax = Number(rangeSlider.attr('data-range-max'));

      console.log(rangeMin, rangeMax);
  
      noUiSlider.create(rangeSlider[0], {
        start: [inputStartValue, inputEndValue],
        step: 1,
        range: {
          min: rangeMin,
          max: rangeMax
        },
        connect: true,
        format: wNumb({
          decimals: 1
        }),
      });
  
      rangeSlider[0].noUiSlider.on('update', function (values, handle) {
  
        const value = values[handle];
  
        if (handle) {
          inputEnd.val(value)
        } else {
          inputStart.val(value)
        }
      });
  
      inputStart.on('change', function() {
        rangeSlider[0].noUiSlider.set([+this.value, null])
      })
      inputEnd.on('change', function() {
        rangeSlider[0].noUiSlider.set([null, +this.value])
      })
    })
  }
})