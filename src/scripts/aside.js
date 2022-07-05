export function selectHandler() {

    const select = $('[data-select-aside]')

    if (select.length) {
      const dependentSelect = select.closest('[data-aside-block]').find('[data-select-dependent]')

      function removeOptions() {
        const options = dependentSelect.find('option')
        options.each(function() {
          if ($(this).attr('value')) {
            $(this).remove()
          }
        })
      }

      select.on('change', function() {
        if (this.value) {
          dependentSelect.val(null)
          removeOptions()

          const arr = JSON.parse($(this.options[this.selectedIndex]).attr('data-options'))
          arr.forEach(item => {
            const newOption = new Option(item, item)
            dependentSelect.append(newOption)
          })

          dependentSelect.parent().removeClass('disabled')
        } else {
          removeOptions()

          dependentSelect.parent().addClass('disabled')
        }
      })
    }
}

export function aside() {
  const aside = $('.aside')

  if (aside.length) {
    // clear general
    const checkbox = aside.find('[data-aside-checkbox]')
    const selects = aside.find('.select__select')
    const clearButtons = aside.find('[data-clear-block]')
    const inputs = aside.find('[data-aside-input]')
    const defaultRadio = aside.find('[data-radio-default]')
    const error = aside.find('.aside__error')
    const multiSelects = aside.find('[data-aside-accordion]')

    $('[data-clear-button]').on('click', function() {
      checkbox.prop('checked', false)
      selects.val(null).trigger('change')
      clearButtons.addClass('hidden')
      inputs.each(function() {
        $(this).val($(this).attr('value'))
      })
      error.addClass('hidden')
      defaultRadio.prop('checked', true)

      window.dispatchEvent(new CustomEvent('clearFilters'));

      if (multiSelects.length) {
        multiSelects.each(function() {
          window.dispatchEvent(new CustomEvent('clearMultiSelect',
              {detail: $(this)[0]}
          ));
        })
      }
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
      const btn = $(this).closest('[data-aside-block]').find('[data-clear-block]')

      if (this.hasAttribute('data-single-input')) {
        if (this.value) {
          btn.removeClass('hidden')
        } else {
          btn.addClass('hidden')
        }
      } else {
        const value = $(this).attr('value')

        if (+value !== +this.value) {
          btn.removeClass('hidden')
        } else {
          btn.addClass('hidden')
        }
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
      boxes.prop('checked', false)

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
        container.find('[data-radio-default]').prop('checked', true)
      }

      const inputError = container.find('.aside__error')

      if (inputError) {
        inputError.addClass('hidden')
      }

      const multiSelect = container.find('[data-aside-accordion]')

      if (multiSelect.length) {
        window.dispatchEvent(new CustomEvent('clearMultiSelect',
            {detail: multiSelect[0]}
        ));
      }

      $(this).addClass('hidden')
      window.dispatchEvent(new CustomEvent('clearFilters'));
    })
  }
}

$(() => {
  aside()

  // select reveal + dynamic options change
  selectHandler()
})
