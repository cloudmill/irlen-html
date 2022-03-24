import 'parsleyjs';


$(() => {
  $("form").parsley();

  Parsley.addMessages('ru', {
    defaultMessage: "Некорректное значение.",
    type: {
      email: "Формат email-адреса некорректный",
      url: "Введите URL адрес.",
      number: "Введите число.",
      integer: "Введите целое число.",
      digits: "Введите только цифры.",
      alphanum: "Введите буквенно-цифровое значение."
    },
    notblank: "Это поле должно быть заполнено.",
    required: "Поле не заполнено",
    pattern: "Не использовать символы или цифры",
    min: "Это значение должно быть не менее чем %s.",
    max: "Это значение должно быть не более чем %s.",
    range: "Это значение должно быть от %s до %s.",
    minlength: "Пароль меньше %s символов",
    maxlength: "Это значение должно содержать не более %s символов.",
    length: "Неверный формат",
    mincheck: "Выберите не менее %s значений.",
    maxcheck: "Выберите не более %s значений.",
    check: "Выберите от %s до %s значений.",
    equalto: "Пароли не совпадают"
  });

  Parsley.setLocale('ru');

  const passwordInputs = $('[data-password]')

  passwordInputs.each(function() {
    const input = $(this)
    const equalTo = $($(this).attr('data-parsley-equalto'))

    input.parsley().on('field:error', function() {
      const equalToError = input.parent().find('.parsley-equalto')

      if (input.val().length > 0 && input.val().length < 7) {
        equalToError.css("display", "none")
      } else {
        equalToError.css('display', '')
      }
    })

    input.on('input', function() {
      if ($(this).val() === equalTo.val()) {
        equalTo.removeClass('parsley-error')
        equalTo.addClass('parsley-succes')
        equalTo.parent().find('li').remove()
      }
    })

    equalTo.on('input', function() {
      if ($(this).val() === input.val() && input.val().length >= 7) {
        input.removeClass('parsley-error')
        input.addClass('parsley-succes')
        input.parent().find('li').remove()
      }
    })
  })
});