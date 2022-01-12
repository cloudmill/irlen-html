window.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.header__mobile-search')
  const modal = document.querySelector('[data-search-modal]')
  let isOpen = false

  window.addEventListener('click', (event) => {
    const target = event.target.closest('[data-search-button]')

    if (target) {
      button.classList.toggle('active')
      modal.classList.toggle('active')

      if (!isOpen) {
        document.querySelector('.search-modal__input').focus()
      }
      isOpen = !isOpen
    } else {
      if (isOpen) {
        button.classList.remove('active')
        modal.classList.remove('active')
        isOpen = false
      }
    }
  })
})