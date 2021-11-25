

$(() => {
  const checkbox = $('[data-login-checkbox]')

  if (checkbox) {
    
    checkbox.on('change', function() {
      
      if (this.checked) {
        $('[data-form-corp]').addClass('active')
        $('[data-form-user]').removeClass('active')
      } else {
        $('[data-form-corp]').removeClass('active')
        $('[data-form-user]').addClass('active')
      }
    })
  }
})