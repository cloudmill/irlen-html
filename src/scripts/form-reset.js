
export function formReset(instance, slide) {
  const response = slide.$content.find("[data-response-active]")

  if (response.length) {
    const form = slide.$content.find("[data-form]")

    form.each(function() {
      this.reset()
    })
    response.removeAttr("data-response-active")
    $('[data-form-parent]').removeAttr("data-form-hidden")
  }
}