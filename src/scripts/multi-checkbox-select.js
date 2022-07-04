
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('[data-accordion-checkbox]')

  if (inputs.length) {
    const PLACEHOLDER = 'Выбрать'
    inputs.forEach(item => {
      const value = item.getAttribute('data-accordion-checkbox')
      
      item.onchange = function() {
        const text = item.closest('[data-aside-accordion]').querySelector('[data-accordion-text]')

        if (this.checked) {
          if (text.textContent === PLACEHOLDER) {
            text.textContent = value
          } else {
            let arr = text.textContent.split(', ')
            arr.push(value)
            text.textContent = arr.join(', ')
          }
        } else {
          let arr = text.textContent.split(', ')
          
          if (arr.length === 1) {
            text.textContent = PLACEHOLDER
          } else {
            const result = arr.filter(item => item !== value)
            text.textContent = result.join(', ')
          }
        }
      }
    })

    window.addEventListener('clearMultiSelect', event => {
      const text = event.detail.querySelector('[data-accordion-text]')
      text.textContent = PLACEHOLDER
    })
  }
})