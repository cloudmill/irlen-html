import Swiper from 'swiper/bundle';

const BREAKPOINT = 1280;

// swiper 
{
  $(window).on('load', () => { // ?
    const slider = $('[data-slider-id]');

    if (slider.length !== 0) {
      slider.each(function () {
        const slider_el = $(this);
        const slider_id = slider_el.data('slider-id');
        const slider_prev_id = slider_el.data('slider-prev');
        const slider_next_id = slider_el.data('slider-next');
        const slider_prev = $(`[data-slider-button="${slider_prev_id}"]`);
        const slider_next = $(`[data-slider-button="${slider_next_id}"]`);

        let slider_options = {
          slidesPerView: 'auto',

          spaceBetween: 8,

          breakpoints: {
            [BREAKPOINT]: {
              spaceBetween: 20,
            },
          },
        };

        switch (slider_id) {
          case 10:
            slider_options = {
              // ...slider_options,
              pagination: {
                el: '.swiper-pagination',
              },
              
              breakpoints: {
                [BREAKPOINT]: {
                  pagination: false,
                },
              },
            }
            break;
        }

        const slider_swiper = new Swiper(slider_el[0], slider_options);

        slider_prev.on('click', () => {
          slider_swiper.slidePrev();
        });
        slider_next.on('click', () => {
          slider_swiper.slideNext();
        });
      });
    }
  });
}

// скрытие контролов если один слайд

document.addEventListener('DOMContentLoaded', () => {

  const sliderBlocks = document.querySelectorAll('[data-controls-hide]');

  if (sliderBlocks.length) {

    sliderBlocks.forEach(item => {

      const slides = item.querySelectorAll('.swiper-slide');
      const controls = item.querySelector('[data-controls]');

      if (slides.length < 2) {
        controls.style.display = 'none';
      }

    })

  }

})