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



document.addEventListener('DOMContentLoaded', () => {

  const range = document.querySelectorAll('[data-range]');

  console.log(range);

  range.forEach(item => {

    const input1 = item.querySelector('[data-range-1]');
    const input2 = item.querySelector('[data-range-2]');

    const input1min = Number(input1.getAttribute('min'));
    const input1max = Number(input1.getAttribute('max'));

    const input2min = Number(input2.getAttribute('min'));
    const input2max = Number(input2.getAttribute('max'));


    input1.addEventListener('focusout', () => {
      const input1val = Number(input1.value);

      input1.closest('.range__label').classList.remove('error');
  
      if (input1min <= input1val && input1val <= input1max) {
        input1.closest('.range__label').classList.remove('error');
      } else {
        input1.value = input1min;
        input1.closest('.range__label').classList.add('error');
      }
    })

    input2.addEventListener('focusout', () => {
      const input1val = Number(input1.value);
      const input2val = Number(input2.value);

      input2.closest('.range__label').classList.remove('error');
  
      if (input2min <= input2val && input2val <= input2max && input2val >= input1val) {
        input2.closest('.range__label').classList.remove('error');
      } else {
        input2.value = input2max;
        input2.closest('.range__label').classList.add('error');
      }
    })

  })

})