
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
        if (manual) {
          this.tabsBlock[i].classList.add('active')
        }
      }
    })
  }
}