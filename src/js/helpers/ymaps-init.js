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
