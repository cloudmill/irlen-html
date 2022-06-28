$(() => {
  const aside = $('.aside')

  if (aside.length) {
    // clear general
    const checkbox = aside.find('[data-aside-checkbox]')
    const selects = aside.find('.select__select')
    const clearButtons = aside.find('[data-clear-block]')
    const inputs = aside.find('[data-aside-input]')
    const defaultRadio = aside.find('[data-radio-default]')

    $('[data-clear-button]').on('click', function() {
      checkbox.prop('checked', false).change()
      selects.val(null).trigger('change')
      clearButtons.addClass('hidden')
      inputs.each(function() {
        $(this).val($(this).attr('value')).change()
      })

      defaultRadio.prop('checked', true).change()
    })

    // reveal single block clear button 
    checkbox.on('change', function() {
      const btn = $(this).closest('[data-aside-block]').find('[data-clear-block]')

      if (this.checked) {
        btn.removeClass('hidden')
      } else {
        const allBoxes = $(this).closest('[data-aside-block]').find('[data-aside-checkbox]')
        let isAllFalse = true

        allBoxes.each(function() {
          if (this.checked) {
            isAllFalse = false
            return false;
          }
        })

        if (isAllFalse) {
          btn.addClass('hidden')
        }
      }
    })

    inputs.on('change', function() {
      const value = $(this).attr('value')
      const btn = $(this).closest('[data-aside-block]').find('[data-clear-block]')

      if (value !== this.value) {
        btn.removeClass('hidden')
      }
    })

    const radioButtons = aside.find('.radio__input')

    radioButtons.on('change', function() {
      const btn = $(this).closest('[data-aside-block]').find('[data-clear-block]')

      if ($(this).attr('data-radio-default')) {
        btn.addClass('hidden')
      } else {
        btn.removeClass('hidden')
      }
    })

    // clear single block
    $('[data-clear-block]').on('click', function() {
      const container = $(this).closest('[data-aside-block]')
      const boxes = container.find('[data-aside-checkbox]')
      boxes.prop('checked', false).change()

      const select = container.find('.select__select')
      
      if (select.length) {
        select.val(null).trigger('change')
        $(this).addClass('hidden')
      }

      const input = container.find('[data-aside-input]')

      if (input.length) {
        input.each(function() {
          $(this).val($(this).attr('value'))
        })
        $(this).addClass('hidden')
      }

      const radioBtn = container.find('.radio__input') 
      
      if (radioBtn.length) {
        container.find('[data-radio-default]').prop('checked', true).change()
      }
    })
  }
})