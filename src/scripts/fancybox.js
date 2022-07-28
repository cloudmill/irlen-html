import '@fancyapps/fancybox';
import {formReset} from './form-reset'

// fancybox
{
  $(() => {


    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;
    $.fancybox.defaults.hideScrollbar = false;
    $.fancybox.defaults.baseTpl = (
      '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-stage"></div>' +
      '</div>'
    );
    $.fancybox.defaults.afterClose = formReset;

    $(document).on('click', '[data-fancy-button]', function (event) {
      event.preventDefault();

      const button = $(this)
      const id = $(this).data('fancy-button');
      const modal = $(`[data-fancy-modal="${id}"]`);

      switch (id) {
        case 10:
          $.fancybox.defaults.animationEffect = 'slide-in-out'
          $.fancybox.defaults.animationDuration = 500
          break
        case 'p1':
          $.fancybox.defaults.animationEffect = 'slide-in-out'
          $.fancybox.defaults.animationDuration = 500
          break
        case 'product1':
          $.fancybox.defaults.beforeShow = function(instance, slide) {
            const productCount = button.closest('[data-count-parent]').find('[data-count-number]')
            const modalCount = $(slide.src).find('[data-product-count]')

            modalCount.text(productCount.val())
          }
          break
        default:
          $.fancybox.defaults.closeExisting = true;
          $.fancybox.defaults.touch = false;
          $.fancybox.defaults.hideScrollbar = false;
          $.fancybox.defaults.baseTpl = (
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-stage"></div>' +
            '</div>'
          )
          $.fancybox.defaults.animationEffect = 'zoom'
          $.fancybox.defaults.animationDuration = 500
      }

      $.fancybox.open(modal);
    });
  });
}
