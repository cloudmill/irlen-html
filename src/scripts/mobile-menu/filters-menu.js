import { MobileMenu } from "./mobile-menu";

export class FiltersMenu extends MobileMenu {
  constructor(selector, button) {
    super(selector, button)

    if (this.root) {
      this.checkboxes = this.root.querySelectorAll('.checkbox__input')
      this.generalCount = document.querySelector('.aside__num')

      this.filtersManager()
    }
  }

  filtersManager() {
    window.addEventListener('click', event => {
      const target = event.target

      if (target.closest('[data-filters-accept]')) {
        this.findId('data-filters-accept', target)
        
        this.acceptChanges(this.id)
      }

      if (target.closest('[data-filters-clear]')) {
        this.findId('data-filters-clear', target)

        this.clearSelected()
      } 
    })
  }

  acceptChanges(id) {
    let count = 0

    if (id === 'general') {
      this.checkboxes.forEach(item => {
        if (item.checked) {
          count++
        }
      })

      this.generalCount.textContent = count ? `(${count})` : ''
      this.closeMenu()

    } else {
      const checkboxes = this.modal.querySelectorAll('.checkbox__input')
      const button = document.querySelector(`[data-modal-btn=${id}]`)
      const filtersCount = button.querySelector('[data-filters-count]')
  
      checkboxes.forEach(item => {
        if (item.checked) {
          count++
        }
      })
      
      filtersCount.textContent = count ? `(${count})` : ''
      this.modal.classList.remove('active')
    }
  }

  clearSelected() {
    const counters = document.querySelectorAll('[data-filters-count]')

    counters.forEach(item => {
      item.textContent = ''
    })

    this.generalCount.textContent = ''

    this.checkboxes.forEach(item => {
      if (item.checked) {
        item.checked = false
      }
    })
  }
}