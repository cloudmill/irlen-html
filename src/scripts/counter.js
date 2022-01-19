export class Counter {
  constructor(selector) {
    this.root = selector
    this.plus = this.root.querySelector('[data-count-plus]')
    this.minus = this.root.querySelector('[data-count-minus]')
    this.number = this.root.querySelector('.counter__number')

    if (this.root) {
      this.init()
    }
  }

  init() {
    window.addEventListener('click', e => {
      const target = e.target.closest('.counter__item')

      if (target === this.minus) {
        if (+this.number.value) {
          this.number.value = +this.number.value - 1
        }
      }

      if (target === this.plus) {
        this.number.value = +this.number.value + 1
      }
    })
  }
}