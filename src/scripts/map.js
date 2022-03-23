// map
const BREAKPOINT = 1280;


if ($('.contacts-page').length) {
  try {
    ymaps.ready(() => {
      const maps = $('[data-map-parent]')
      maps.each(function() {
        const id = $(this).attr('id')
        const center = $(this).data('map-parent').split(' ')

        // vars
        const markWidth = 33;
        const markHeight = 45;  

        // init
        const map = new ymaps.Map(
          id,
          {
            center: center,
            zoom: 15,
            controls: [],
          },
          {
            maxZoom: 22,
          }
        );

        // добавление точек
        const placemarks = new ymaps.GeoObjectCollection();
        const items = $(this).closest('[data-map-container]').find('.placemarks__item')

        items.each(function () {
          // данные
          const balloon = $(this).find(".placemarks__balloon").text().trim();
          const latitude = $(this).find(".placemarks__latitude").text().trim();
          const longitude = $(this).find(".placemarks__longitude").text().trim();

          // placemark
          const coordinates = [latitude, longitude];
          const placemark = new ymaps.Placemark(
            coordinates,
            {
              balloon,
            },
            {
              iconLayout: "default#image",
              iconImageHref: "assets/images/svg/placemark.svg",
              // iconImageHref: "/local/templates/main/assets/images/placemark.svg",
              iconImageSize: [markWidth, markHeight],
              iconImageOffset: [-markWidth / 2, -80],

              balloonPanelMaxMapArea: 0,
              hideIconOnBalloonOpen: false,
            }
          );
          placemarks.add(placemark);
        });

        // добавление на карту
        map.geoObjects.add(placemarks);

        // позиционирование на точках
        map
          .setBounds(placemarks.getBounds(), {
            zoomMargin: Math.max(markWidth, markHeight),
          })
          .then(() => {
            if (items.length === 1) {
              map.setZoom(12);
            }
          });
      });
    })
  } catch (err) {
    console.error(err)
  }
}