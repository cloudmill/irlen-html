import {mediaQuery} from './mediaQueries'

export class Tabs {
  constructor(selector, manual) {
    this.roots = selector
    
    if (this.roots) {
      this.rootsTabs = this.roots.querySelectorAll('[data-tabs-item]')

      this.init(manual)
    }
  }

  init(manual) {
    this.roots.addEventListener('click', (e) => {
      const target = e.target.closest('[data-tabs-item]')

      if (target) {
        this.setActive(target, manual)
      }
    })
  }

  setActive(newItem, manual) {
    if (manual) {
      const parent = this.roots.closest('[data-tabs-parent]')
      this.tabsBlock = parent.querySelectorAll('[data-tabs-block]')
    }

    this.rootsTabs.forEach((item, i) => {
      if (item !== newItem) {
        item.classList.remove('active')
        if (manual) {
          this.tabsBlock[i].classList.remove('active')
        }
      } else {
        item.classList.add('active');
        this.scrollIntoView(i)
        if (manual) {
          this.tabsBlock[i].classList.add('active')
        }
      }
    })
  }

  scrollIntoView(index) {
    if (!mediaQuery.matches) {
      if (index) {
        let distance = 0;

        for (let x = 0; x < index; x++) {
          distance += this.rootsTabs[x].offsetWidth + this.rootsTabs[x].offsetLeft
        }

        this.roots.scrollLeft = distance / 2
      } else {
        this.roots.scrollLeft = 0
      }
    }
  }
}