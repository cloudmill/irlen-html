

export class FormChanger {
  constructor() {
    this.changeButton = document.querySelector('[data-change-button]')

    if (this.changeButton) {
      this.form = this.changeButton.closest('[data-form]')
      
      this.clickHandler()
    }
  }

  clickHandler() {
    window.addEventListener('click', e => {
      const target = e.target

      if (target.closest('[data-change-button]')) {
        this.cashValues()
        this.form.classList.toggle('form--disabled')
      }

      if (target.closest('[data-save-button]')) {
        this.form.classList.toggle('form--disabled')
      }

      if (target.closest('[data-cancel-button]')) {
        this.cancelChanges()
      }
    })
  }

  cashValues() {
    this.inputs = this.form.querySelectorAll('.form__input')
    this.values = []

    this.inputs.forEach(item => {
      this.values.push(item.value)
    })
  }

  cancelChanges() {
    this.form.classList.add('form--disabled')

    for (let i = 0; i < this.values.length; i++) {
      this.inputs[i].value = this.values[i]
    }
  }
}