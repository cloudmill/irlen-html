import {mediaQuery} from './mediaQueries'

$(() => {
  if ($('[data-crop-text]').length) {
    $('[data-crop-text]').each(function () {
      const text = $(this)
  
      const originalText = text.text()
  
      let lineCount = 5
  
      const lineHeightM = 14
      const lineHeightD = 20
  
      function getLineHeight() {
        return mediaQuery.matches ? lineHeightD : lineHeightM
      }

      function updateTitle() {
        const lineHeight = getLineHeight()
  
        text.text(originalText)
  
        if (text.height() > (lineHeight * lineCount)) {
          let newText = originalText
  
          while (text.height() > (lineHeight * lineCount)) {
            newText = newText.substring(0, newText.length - 1).trim()
  
            text.text(newText)
          }
  
          newText = newText.substring(0, newText.length - 5).trim() + '...'
          text.text(newText)
        }
      }
  
      updateTitle()
  
      window.addEventListener('resize', handleResize, {
        once: true,
      })
  
      function handleResize() {
        updateTitle()
  
        setTimeout(() => {
          updateTitle()
  
          window.addEventListener('resize', handleResize, {
            once: true,
          })
        }, 1000)
      }
    })
  }
});