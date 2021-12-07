import { mediaQuery } from './mediaQueries'

// scroll
{
  $(() => {

    if (mediaQuery.matches) {

      const header = $('.header')
  
      const fps = 120
  
      let scrollTop = $(window).scrollTop()
  
      $(window).one('scroll', scroll)
  
      function scroll() {
        update()
  
        setTimeout(() => {
          update()
  
          $(window).one('scroll', scroll)
        }, 1000 / fps)
      }
  
      function update() {
        const newScrollTop = $(window).scrollTop()
  
        if (Math.abs(scrollTop - newScrollTop) >= 1) {
          if (newScrollTop > scrollTop) {
            header.addClass('header--up')
          } else {
            header.removeClass('header--up')
          }
        }
  
        if (scrollTop < 1) {
          header.removeClass('header--up')
        }
  
        if ($('[data-header-transparent]').length) {
          if (scrollTop < 1) {
            header.addClass('header--transparent')
          } else {
            header.removeClass('header--transparent')
          }
        }
  
        scrollTop = newScrollTop
      }
    }
  });
}

// desktop header accordion
{
  $(() => {

    if (mediaQuery.matches) {
      const header = $('.header')
      const headerButton = header.find('[data-accordion-header]')
      const modals = header.find('[data-header-modal]')
  
      const stateManager = {
        closeAll: () => {
          modals.slideUp()
          headerButton.removeClass('active')
        },
        classRemove: () => {
          $('.body').removeClass('body--hidden')
          $('.header__modal').removeClass('header__modal--active')
        }
      }
  
      window.addEventListener('click', event => {
        const button = event.target.closest('[data-accordion-header]')
  
        if (button) {
          const id = button.getAttribute('data-accordion-header')
  
          if (button.classList.contains('active')) {
            button.classList.remove('active')
            $(`[data-header-modal=${id}]`).slideUp()
            stateManager.classRemove()
          } else {
            stateManager.closeAll()
  
            button.classList.add('active')
            $('.body').addClass('body--hidden')
            $('.header__modal').addClass('header__modal--active')
            $(`[data-header-modal=${id}]`).slideDown()
          }
        }
  
        if (event.target.classList.contains('header__modal-overlay')) {
          stateManager.closeAll()
          stateManager.classRemove()
        }
      })
    }
  })
}

// mobile menu
export class HeaderMenu {
  constructor() {
    this.root = document.querySelector('.header')
    this.isOpen = false

    this.clickHander()
  }

  clickHander() {

    window.addEventListener('click', event => {
      const target = event.target

      if (target.closest('.header__menu')) {

        if (this.isOpen) {
          this.closeMenu()
        } else {
          this.root.classList.add('header--menu')
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

    this.root.classList.remove('header--menu')
    document.body.classList.remove('body--hidden')

    modals.forEach(item => {
      item.classList.remove('active')
    })
  }
}