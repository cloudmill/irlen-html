$(() => {
  const aside = $('.aside')

  if (aside.length) {
    // clear general
    const checkbox = aside.find('[data-aside-checkbox]')
    const selects = aside.find('.select__select')
    const clearButtons = aside.find('[data-clear-block]')

    $('[data-clear-button]').on('click', function() {
      checkbox.prop('checked', false).change()
      selects.val(null).trigger('change')
      clearButtons.addClass('hidden')
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
    })
  }
})