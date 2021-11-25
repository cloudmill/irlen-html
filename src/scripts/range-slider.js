import noUiSlider from 'nouislider';
import wNumb from 'wnumb'

$(() => {
  const rangeParent = $('[data-range-block]')

  rangeParent.each(function() {
    const rangeSlider = $(this).find('.range__range')
    const inputStart = $(this).find('[data-input-start]')
    const inputEnd = $(this).find('[data-input-end]')

    noUiSlider.create(rangeSlider[0], {
      start: [30, 70],
      step: 1,
      range: {
        min: 10,
        max: 100
      },
      connect: true,
      format: wNumb({
        decimals: 0
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
})