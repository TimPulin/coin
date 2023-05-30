import { el } from 'redom';

export async function yandexMapInit(atmPosistionList) {
  // eslint-disable-next-line
  const mapAtm = await ymaps.ready(init);
  // TODO добавить провекрку наличия ympas и сообщение

  function init() {
    const elMap = document.querySelector('#map-yandex');
    // eslint-disable-next-line
      const mapAtm = new ymaps.Map(elMap, {
      center: [55.76, 37.64],
      zoom: 11,
    });

    for (let position of atmPosistionList) {
      // eslint-disable-next-line
      let placemark = new ymaps.Placemark([position.lat, position.lon]);
      mapAtm.geoObjects.add(placemark);
    }
  }
}

export function addYMapLink() {
  const YMapAPIKey = '6eb96e92-4b9a-4720-bccb-646f423c019c';
  const script = el('script', {
    src: `https://api-maps.yandex.ru/2.1/?apikey=${YMapAPIKey}&lang=ru_RU`,
  });
  document.head.prepend(script);
}
