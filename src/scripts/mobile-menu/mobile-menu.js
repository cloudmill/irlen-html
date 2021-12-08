
export class MobileMenu {
  constructor(selector, button) {
    this.root = document.querySelector(selector)
    this.isOpen = false

    this.clickHander(button)
  }

  clickHander(button) {

    window.addEventListener('click', event => {
      const target = event.target

      if (target.closest(button)) {

        if (this.isOpen) {
          this.closeMenu()
        } else {
          this.root.classList.add('menu')
          document.body.classList.add('body--hidden')
        }

        this.isOpen = !this.isOpen
      }

      if (target.classList.contains('mobile-menu__overlay')) {
        this.isOpen = false
        this.closeMenu()
      }

      if (target.closest('[data-modal-btn]')) {
        const id = target.closest('[data-modal-btn]').getAttribute('data-modal-btn')

        document.querySelector(`[data-modal-menu="${id}"]`).classList.add('active')
      }

      if (target.closest('[data-modal-close]')) {
        const id = target.closest('[data-modal-close]').getAttribute('data-modal-close')

        document.querySelector(`[data-modal-menu="${id}"]`).classList.remove('active')
      }
    })
  }

  closeMenu() {
    const modals = document.querySelectorAll('[data-modal-menu]')

    this.root.classList.remove('menu')
    document.body.classList.remove('body--hidden')

    modals.forEach(item => {
      item.classList.remove('active')
    })
  }
}