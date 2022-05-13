import {mediaQuery} from './mediaQueries'

export class Tabs {
  constructor(selector) {
    this.root = selector
    
    if (document.querySelector(this.root)) {
      this.init()
    }
  }

  init() {
    window.addEventListener('click', (e) => {
      const target = e.target.closest('[data-tabs-item]')

      if (target) {
        this.setActive(target)
      }
    })
  }

  setActive(newItem) {
    const container = newItem.closest('[data-tabs]')
    const activeItem = container.querySelector('[data-tabs-item].active')
    const items = container.querySelectorAll('[data-tabs-item]')

    activeItem.classList.remove('active')
    newItem.classList.add('active')

    items.forEach((item, i) => {
      if (item.classList.contains('active')) {
        this.scrollIntoView(i, items, container)
      }
    })
  }

  scrollIntoView(index, items, container) {
    if (!mediaQuery.matches) {
      if (index) {
        let distance = 0;

        for (let x = 0; x < index; x++) {
          distance += items[x].offsetWidth + items[x].offsetLeft
        }

        container.scrollLeft = distance / 2
      } else {
        container.scrollLeft = 0
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Tabs('[data-tabs]')
})