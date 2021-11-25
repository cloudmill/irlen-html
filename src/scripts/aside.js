

$(() => {
  const aside = $('.aside')

  if (aside.length) {
    const checkbox = aside.find('.checkbox__input')

    $('[data-clear-button]').on('click', function() {
      checkbox.prop('checked', false)
    })
  }
})